import { SyncerError } from "."
import {
    GetRowsTask, UpdateRowTask, DeleteRowTask, GapiErrorResponse, GetSheetsTask
} from "../../types"

export class SyncerTasks {

    public extendSheetLength = 100

    public async getSheets(token: string, task: GetSheetsTask) {
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${task.spreadsheetId}`
        let headers = { Authorization: `Bearer ${token}` }
        let opts: RequestInit = { method: "GET", cache: "no-cache", headers: headers }
        let response = await fetch(url, opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(
                JSON.stringify(error),
                `Failed to get spreadsheet details for spreadsheet: ${task.spreadsheetId}`,
                response.status === 401
            )
        } else {
            let data: gapi.client.sheets.Spreadsheet = await response.json()
            return data.sheets || []
        }
    }

    public async getRows(token: string, task: GetRowsTask) {
        let range = `${task.sheetTitle}!A:A`
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${task.spreadsheetId}/values/${range}`
        let headers = { Authorization: `Bearer ${token}` }
        let opts: RequestInit = { method: "GET", cache: "no-cache", headers: headers }
        let response = await fetch(url, opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(
                JSON.stringify(error),
                `Failed to get sheet rows: ${range}`,
                response.status === 401)
        } else {
            let data: gapi.client.sheets.ValueRange = await response.json()
            let rows: string[] = (data.values) ? data.values.map(row => row[0]) : []
            return rows
        }
    }

    // TODO: public async createRow(...) {}
    // https://developers.google.com/sheets/api/samples/rowcolumn#insert_an_empty_row_or_column

    public async updateRow(token: string, task: UpdateRowTask) {
        let range = `${task.sheetTitle}!A${task.idx + 1}:A${task.idx + 1}`
        let url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${task.spreadsheetId}/values/${range}`)
        let headers = { Authorization: `Bearer ${token}` }
        let params: Record<string, string> = { valueInputOption: "RAW" }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        let body = JSON.stringify({ range: range, majorDimension: "ROWS", values: [[task.content]] })
        let opts: RequestInit = { method: "PUT", cache: "no-cache", headers: headers, body: body }
        let response = await fetch(url.toString(), opts)
        let data = await response.json()
        if (!response.ok) {
            if (data.error.message.includes("exceeds grid limits")) {
                await this.extendSheet(token, task.spreadsheetId, task.sheetId)
                let secondResponse = await fetch(url.toString(), opts)
                if (!secondResponse.ok) {
                    let error: GapiErrorResponse = await response.json()
                    throw new SyncerError(JSON.stringify(error), `Failed to update row: ${range}`, response.status === 401)
                } else {
                    return
                }
            }
            throw new SyncerError(JSON.stringify(data), `Failed to update row: ${range}`, response.status === 401)
        }
    }

    public async deleteRow(token: string, task: DeleteRowTask) {
        let range = { sheetId: task.sheetId, startRowIndex: task.idx, endRowIndex: task.idx + 1, startColumnIndex: 0 }
        let url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${task.spreadsheetId}:batchUpdate`)
        let headers = { Authorization: `Bearer ${token}` }
        let body = JSON.stringify({ requests: [{ deleteRange: { range: range, shiftDimension: "ROWS" } }] })
        let opts: RequestInit = { method: "POST", cache: "no-cache", headers: headers, body: body }
        let response = await fetch(url.toString(), opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(JSON.stringify(error), `Failed to delete row: ${task.idx}`, response.status === 401)
        }
    }

    // TODO: public async moveRow() {}
    // https://developers.google.com/sheets/api/samples/rowcolumn#move_a_row_or_column

    private async extendSheet(token: string, spreadsheetId: string, sheetId: number) {
        let url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`)
        let headers = { Authorization: `Bearer ${token}` }
        let body = JSON.stringify({ requests: [{ appendDimension: { sheetId: sheetId, dimension: "ROWS", length: this.extendSheetLength } }] })
        let opts: RequestInit = { method: "POST", mode: "cors", cache: "no-cache", headers: headers, body: body }
        let response = await fetch(url.toString(), opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(JSON.stringify(error), "Failed to extend sheet", response.status === 401)
        }
    }

}
