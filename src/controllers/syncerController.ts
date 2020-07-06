import { syncerModel } from "../models"
import { SyncerTaskType, TestMode, GetRowsTask, GetSheetsTask } from "../types"

export const syncerController = {
    updateTestMode: updateTestMode,
    updateAuth: updateAuth,
    getSheets: getSheets,
    getRows: getRows,
    deleteRow: deleteRow,
    updateRow: updateRow,
    unpause: unpause,
}

async function updateTestMode(testMode: TestMode) {
    return await syncerModel.pushSyncerTask({
        type: SyncerTaskType.TEST_MODE_UPDATE,
        testMode: testMode,
    })
}

async function updateAuth(token: string) {
    return await syncerModel.pushSyncerTask({
        type: SyncerTaskType.AUTH_UPDATE,
        token: token,
    })
}

async function getSheets(spreadsheetId: string) {
    let task: GetSheetsTask = {
        type: SyncerTaskType.GET_SHEETS,
        spreadsheetId: spreadsheetId,
    }
    let result = await syncerModel.pushSyncerTask(task)
    return result
}

async function getRows(spreadsheetId: string, sheetId: number, sheetTitle: string) {
    let task: GetRowsTask = {
        type: SyncerTaskType.GET_ROWS,
        spreadsheetId: spreadsheetId,
        sheetTitle: sheetTitle,
        sheetId: sheetId,
    }
    let result = await syncerModel.pushSyncerTask(task)
    return result
}

async function deleteRow(idx: number, spreadsheetId: string, sheetId: number) {
    return await syncerModel.pushSyncerTask({
        type: SyncerTaskType.DELETE_ROW,
        spreadsheetId: spreadsheetId,
        sheetId: sheetId,
        idx: idx,
    })
}

async function updateRow(idx: number, spreadsheetId: string, sheetId: number, sheetTitle: string, content: string) {
    return await syncerModel.pushSyncerTask({
        type: SyncerTaskType.UPDATE_ROW,
        spreadsheetId: spreadsheetId,
        sheetTitle: sheetTitle,
        sheetId: sheetId,
        content: content,
        idx: idx,
    })
}

async function unpause() {
    return await syncerModel.pushSyncerTask({ type: SyncerTaskType.UNPAUSE })
}