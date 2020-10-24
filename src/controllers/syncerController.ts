import m from "mithril"
import { errorsController } from "."
import { googleModel, syncerModel } from ".."
import { SyncerPayloadType, TestMode, SyncerPayload, ErrorPayload } from "../types"

const worker = new Worker("./js/syncWebWorker.js")
worker.onmessage = (msg: MessageEvent) => onMessage(msg)

export const syncerController = {
    unpause: unpause,
    getRows: getRows,
    createRow: createRow,
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
        rejects: false,
    }, worker)
}

function updateAuth(token: string | undefined) {
    if (token === undefined) return
    return syncerModel.pushSyncerTask({
        type: SyncerPayloadType.AUTH_UPDATE,
        token: token,
        rejects: false,
    }, worker)
}

function getSpreadsheet(spreadsheetId: string) {
    let spreadsheet: gapi.client.sheets.Spreadsheet | undefined = undefined
    return syncerModel.pushSyncerTask({
        type: SyncerPayloadType.GET_SPREADSHEET,
        spreadsheetId: spreadsheetId,
        spreadsheet: spreadsheet,
        rejects: true,
    }, worker)
}

async function createRow(shelfId: string, journalId: number, idx: number) {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.CREATE_ROW,
        spreadsheetId: shelfId,
        sheetId: journalId,
        idx: idx,
        rejects: false,
    }, worker)
}

function getRows(shelfId: string, journalId: number, journalTitle: string) {
    let rows: string[] = []
    return syncerModel.pushSyncerTask({
        type: SyncerPayloadType.GET_ROWS,
        spreadsheetId: shelfId,
        sheetTitle: journalTitle,
        sheetId: journalId,
        rows: rows,
        rejects: true,
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
        rejects: false,
    }, worker)
}

async function deleteRow(shelfId: string, journalId: number, idx: number) {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.DELETE_ROW,
        spreadsheetId: shelfId,
        sheetId: journalId,
        idx: idx,
        rejects: false,
    }, worker)
}

// TODO - NICE TO HAVE
// async function moveRow() {}

async function unpause() {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.UNPAUSE,
        rejects: false,
    }, worker)
}

function onMessage(msg: MessageEvent) {
    let { id, payload, error }: { id: string | null, payload: SyncerPayload, error: ErrorPayload } = msg.data
    if (id !== null && syncerModel.requests.has(id)) {
        syncerModel.requests.get(id)!({ payload, error })
    } else if (payload !== undefined) {
        switch (payload.type) {
            case SyncerPayloadType.SYNC_STATE:
                syncerModel.state = payload.state
                m.redraw()
                break
            case SyncerPayloadType.ERROR:
                errorsController.add(payload.error.message, payload.friendlyMsg)
                break
            case SyncerPayloadType.TOKEN_REQUEST:
                updateAuth(googleModel.token)
                break
        }
    } else {
        errorsController.add("undefined payload", "An unexpected error occurred.")
    }
}
