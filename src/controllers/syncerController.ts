import { syncerModel } from "../models"
import { SyncerPayloadType, TestMode, GetSpreadsheetPayload, GetSheetsPayload, GetRowsPayload } from "../types"

export const syncerController = {
    updateTestMode: updateTestMode,
    updateAuth: updateAuth,
    getSpreadsheet: getSpreadsheet,
    getSheets: getSheets,
    getRows: getRows,
    deleteRow: deleteRow,
    updateRow: updateRow,
    unpause: unpause,
}

async function updateTestMode(testMode: TestMode) {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.TEST_MODE_UPDATE,
        testMode: testMode,
    })
}

async function updateAuth(token: string) {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.AUTH_UPDATE,
        token: token,
    })
}

async function getSpreadsheet(spreadsheetId: string) {
    let task: GetSpreadsheetPayload = {
        type: SyncerPayloadType.GET_SPREADSHEET,
        spreadsheetId: spreadsheetId,
        spreadsheet: undefined
    }
    let result = await syncerModel.pushSyncerTask(task)
    return result
}

async function getSheets(spreadsheetId: string) {
    let task: GetSheetsPayload = {
        type: SyncerPayloadType.GET_SHEETS,
        spreadsheetId: spreadsheetId,
        sheets: []
    }
    let result = await syncerModel.pushSyncerTask(task)
    return result
}

async function getRows(spreadsheetId: string, sheetId: number, sheetTitle: string) {
    let task: GetRowsPayload = {
        type: SyncerPayloadType.GET_ROWS,
        spreadsheetId: spreadsheetId,
        sheetTitle: sheetTitle,
        sheetId: sheetId,
        rows: []
    }
    let result = await syncerModel.pushSyncerTask(task)
    return result
}

async function deleteRow(idx: number, spreadsheetId: string, sheetId: number) {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.DELETE_ROW,
        spreadsheetId: spreadsheetId,
        sheetId: sheetId,
        idx: idx,
    })
}

async function updateRow(idx: number, spreadsheetId: string, sheetId: number, sheetTitle: string, content: string) {
    return await syncerModel.pushSyncerTask({
        type: SyncerPayloadType.UPDATE_ROW,
        spreadsheetId: spreadsheetId,
        sheetTitle: sheetTitle,
        sheetId: sheetId,
        content: content,
        idx: idx,
    })
}

async function unpause() {
    return await syncerModel.pushSyncerTask({ type: SyncerPayloadType.UNPAUSE })
}
