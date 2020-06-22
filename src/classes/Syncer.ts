import m from "mithril"
import { journal, syncer } from ".."
import { MockGoogleUser } from "../mocks"
import { FriendlyError } from "../helpers"
import { SyncerTask, SyncerTaskType, SyncerResponse, TestMode, SyncerResponseType } from "../types"

export class Syncer {
    public worker: Worker
    public paused: boolean = false
    public user: gapi.auth2.GoogleUser | MockGoogleUser | null = null

    constructor(testMode: TestMode) {
        this.worker = new Worker("./js/syncWebWorker.js")
        this.updateTestMode(testMode)
        this.worker.onmessage = (msg: MessageEvent) => this.onMessage(msg)
    }

    public updateTestMode(testMode: TestMode) {
        this.pushSyncerTask({ testMode: testMode, type: SyncerTaskType.TEST_MODE_UPDATE })
    }

    public updateAuth(token: string) {
        this.pushSyncerTask({ token: token, type: SyncerTaskType.AUTH_UPDATE })
    }

    public getSheets(spreadsheetId: string) {
        this.pushSyncerTask({
            spreadsheetId: spreadsheetId,
            type: SyncerTaskType.GET_SHEETS
        })
    }

    public getRows(spreadsheetId: string, sheetId: number, sheetTitle: string) {
        this.pushSyncerTask({
            spreadsheetId: spreadsheetId,
            sheetId: sheetId,
            sheetTitle: sheetTitle,
            type: SyncerTaskType.GET_ROWS
        })
    }

    public deleteRow(idx: number, spreadsheetId: string, sheetId: number) {
        this.pushSyncerTask({
            idx: idx,
            spreadsheetId: spreadsheetId,
            sheetId: sheetId,
            type: SyncerTaskType.DELETE_ROW
        })
    }

    public updateRow(idx: number, spreadsheetId: string, sheetId: number, sheetTitle: string, content: string) {
        this.pushSyncerTask({
            idx: idx,
            spreadsheetId: spreadsheetId,
            sheetId: sheetId,
            sheetTitle: sheetTitle,
            content: content,
            type: SyncerTaskType.UPDATE_ROW
        })
    }

    public unpause() {
        this.pushSyncerTask({ type: SyncerTaskType.UNPAUSE })
    }

    private pushSyncerTask(task: SyncerTask) {
        this.worker.postMessage(task)
    }

    private onMessage(msg: MessageEvent) {
        let response: SyncerResponse = msg.data
        switch (response.type) {
            case SyncerResponseType.QUEUE_STATE:
                if (response.paused && !syncer.paused) {
                    syncer.paused = true
                } else if (!response.paused && syncer.paused) {
                    syncer.paused = false
                }
                if (journal.loading !== (response.length > 0)) {
                    journal.loading = (response.length > 0)
                }
                m.redraw()
                break
            case SyncerResponseType.SHEETS:
                if (journal.spreadsheets.has(response.spreadsheetId)) {
                    journal.spreadsheets.get(response.spreadsheetId)!.load(response.sheets)
                }
                break
            case SyncerResponseType.ROWS:
                if (
                    journal.spreadsheets.has(response.spreadsheetId)
                    && journal.spreadsheets.get(response.spreadsheetId)!.sheets.has(response.sheetId)
                ) {
                    journal.spreadsheets.get(response.spreadsheetId)!.sheets.get(response.sheetId)!.load(response.rows)
                }
                break
            case SyncerResponseType.ERROR:
                syncer.paused = true
                new FriendlyError(response.error.message, "Unable to sync")
                break
            case SyncerResponseType.REAUTH:
                if (syncer.user !== null) {
                    syncer.user.reloadAuthResponse().then((auth) => {
                        syncer.updateAuth(auth.access_token)
                    }).catch((err) => {
                        new FriendlyError(err, "You're signed out and need to sign back in.")
                    })
                }
                break
        }
    }
}
