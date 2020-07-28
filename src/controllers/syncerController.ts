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
    getSheets: getSheets,
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
    return syncerModel.pushSyncerTask({
        type: SyncerPayloadType.GET_SPREADSHEET,
        spreadsheetId: spreadsheetId,
        spreadsheet: undefined
    }, worker)
}

function getSheets(spreadsheetId: string) {
    return syncerModel.pushSyncerTask({
        type: SyncerPayloadType.GET_SHEETS,
        spreadsheetId: spreadsheetId,
        sheets: []
    }, worker)
}

function getRows(spreadsheetId: string, sheetId: number, sheetTitle: string) {
    return syncerModel.pushSyncerTask({
        type: SyncerPayloadType.GET_ROWS,
        spreadsheetId: spreadsheetId,
        sheetTitle: sheetTitle,
        sheetId: sheetId,
        rows: []
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

// TODO: updateRow

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
    } else {
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
    }
}

