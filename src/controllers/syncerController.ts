import m from "mithril"
import { FriendlyError } from "../errors"
import { googleModel, syncerModel } from ".."
import { SyncerPayloadType, TestMode, SyncerPayload, ErrorPayload } from "../types"

const worker = new Worker("./js/syncWebWorker.js")
worker.onmessage = (msg: MessageEvent) => onMessage(msg)

export const syncerController = {
    unpause: unpause,
    getRows: getRows,
    deleteRow: deleteRow,
    updateRow: updateRow,
    updateAuth: updateAuth,
    updateTestMode: updateTestMode,
    getSpreadsheet: getSpreadsheet,
}

async function updateTestMode(testMode: TestMode) {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.TEST_MODE_UPDATE,
        testMode: testMode,
    }, worker)
}

function updateAuth(token: string | undefined) {
    if (token === undefined) return
    return syncerModel.pushSyncerTask({
        type: SyncerPayloadType.AUTH_UPDATE,
        token: token,
    }, worker)
}

function getSpreadsheet(spreadsheetId: string) {
    let spreadsheet: gapi.client.sheets.Spreadsheet | undefined = undefined
    return syncerModel.pushSyncerTask({
        type: SyncerPayloadType.GET_SPREADSHEET,
        spreadsheetId: spreadsheetId,
        spreadsheet: spreadsheet
    }, worker)
}

function getRows(shelfId: string, journalId: number, journalTitle: string) {
    let rows: string[] = []
    return syncerModel.pushSyncerTask({
        type: SyncerPayloadType.GET_ROWS,
        spreadsheetId: shelfId,
        sheetTitle: journalTitle,
        sheetId: journalId,
        rows: rows
    }, worker)
}

async function deleteRow(idx: number, spreadsheetId: string, sheetId: number) {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.DELETE_ROW,
        spreadsheetId: spreadsheetId,
        sheetId: sheetId,
        idx: idx,
    }, worker)
}

async function updateRow(shelfId: string, journalId: number, journalTitle: string, idx: number, content: string) {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.UPDATE_ROW,
        spreadsheetId: shelfId,
        sheetTitle: journalTitle,
        sheetId: journalId,
        content: content,
        idx: idx,
    }, worker)
}

// TODO: moveRow

async function unpause() {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.UNPAUSE
    }, worker)
}

function onMessage(msg: MessageEvent) {
    let { id, payload, error }: { id: string | null, payload: SyncerPayload, error: ErrorPayload } = msg.data
    if (id !== null && syncerModel.requests.has(id)) {
        syncerModel.requests.get(id)!({ payload, error })
        syncerModel.requests.delete(id)
    } else if (payload !== undefined) {
        switch (payload.type) {
            case SyncerPayloadType.SYNC_STATE:
                syncerModel.state = payload.state
                m.redraw()
                break
            case SyncerPayloadType.ERROR:
                new FriendlyError(payload.error.message, payload.friendlyMsg)
                break
            case SyncerPayloadType.TOKEN_REQUEST:
                updateAuth(googleModel.token)
                break
        }
    } else {
        throw new FriendlyError("undefined payload", "An unexpected error occurred.")
    }
}
