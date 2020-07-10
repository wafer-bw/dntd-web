import { SyncerModel } from "../models"
import { SyncerPayloadType, TestMode, GetSpreadsheetPayload, GetSheetsPayload, GetRowsPayload } from "../types"

export class SyncerController {

    private syncerModel: SyncerModel

    constructor(syncerModel: SyncerModel) {
        console.log(syncerModel)
        this.syncerModel = syncerModel
    }

    public async updateTestMode(testMode: TestMode) {
        return await this.syncerModel.pushSyncerTask({
            type: SyncerPayloadType.TEST_MODE_UPDATE,
            testMode: testMode,
        })
    }

    public updateAuth(token: string) {
        return this.syncerModel.pushSyncerTask({
            type: SyncerPayloadType.AUTH_UPDATE,
            token: token,
        })
    }

    public getSpreadsheet(spreadsheetId: string) {
        let task: GetSpreadsheetPayload = {
            type: SyncerPayloadType.GET_SPREADSHEET,
            spreadsheetId: spreadsheetId,
            spreadsheet: undefined
        }
        return this.syncerModel.pushSyncerTask(task)
    }

    public async getSheets(spreadsheetId: string) {
        let task: GetSheetsPayload = {
            type: SyncerPayloadType.GET_SHEETS,
            spreadsheetId: spreadsheetId,
            sheets: []
        }
        let result = await this.syncerModel.pushSyncerTask(task)
        return result
    }

    public async getRows(spreadsheetId: string, sheetId: number, sheetTitle: string) {
        let task: GetRowsPayload = {
            type: SyncerPayloadType.GET_ROWS,
            spreadsheetId: spreadsheetId,
            sheetTitle: sheetTitle,
            sheetId: sheetId,
            rows: []
        }
        let result = await this.syncerModel.pushSyncerTask(task)
        return result
    }

    public async deleteRow(idx: number, spreadsheetId: string, sheetId: number) {
        return await this.syncerModel.pushSyncerTask({
            type: SyncerPayloadType.DELETE_ROW,
            spreadsheetId: spreadsheetId,
            sheetId: sheetId,
            idx: idx,
        })
    }

    public async updateRow(idx: number, spreadsheetId: string, sheetId: number, sheetTitle: string, content: string) {
        return await this.syncerModel.pushSyncerTask({
            type: SyncerPayloadType.UPDATE_ROW,
            spreadsheetId: spreadsheetId,
            sheetTitle: sheetTitle,
            sheetId: sheetId,
            content: content,
            idx: idx,
        })
    }

    public async unpause() {
        return await this.syncerModel.pushSyncerTask({ type: SyncerPayloadType.UNPAUSE })
    }
}
