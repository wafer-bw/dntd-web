import { SyncerError } from "."
import {
    GapiErrorResponse, GetSheetsPayload, GetRowsPayload, UpdateRowPayload, DeleteRowPayload
} from "../../types"

export class SyncerTasks {

    public extendSheetLength = 100

    public async getSheets<P extends GetSheetsPayload>(token: string, payload: P): Promise<P> {
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${payload.spreadsheetId}`
        let headers = { Authorization: `Bearer ${token}` }
        let opts: RequestInit = { method: "GET", cache: "no-cache", headers: headers }
        let response = await fetch(url, opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(
                JSON.stringify(error),
                `Failed to get spreadsheet details for spreadsheet: ${payload.spreadsheetId}`,
                response.status === 401
            )
        } else {
            payload.sheets = await response.json()
        }
        return payload
    }

    public async getRows<P extends GetRowsPayload>(token: string, payload: P): Promise<P> {
        let range = `${payload.sheetTitle}!A:A`
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${payload.spreadsheetId}/values/${range}`
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
            payload.rows = (data.values) ? data.values.map(row => row[0]) : []
        }
        return payload
    }

    // TODO: public async createRow
    // https://developers.google.com/sheets/api/samples/rowcolumn#insert_an_empty_row_or_column

    public async updateRow<P extends UpdateRowPayload>(token: string, payload: P): Promise<P> {
        let range = `${payload.sheetTitle}!A${payload.idx + 1}:A${payload.idx + 1}`
        let url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${payload.spreadsheetId}/values/${range}`)
        let headers = { Authorization: `Bearer ${token}` }
        let params: Record<string, string> = { valueInputOption: "RAW" }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        let body = JSON.stringify({ range: range, majorDimension: "ROWS", values: [[payload.content]] })
        let opts: RequestInit = { method: "PUT", cache: "no-cache", headers: headers, body: body }
        let response = await fetch(url.toString(), opts)
        let data = await response.json()
        if (!response.ok) {
            if (data.error.message.includes("exceeds grid limits")) {
                await this.extendSheet(token, payload.spreadsheetId, payload.sheetId)
                let secondResponse = await fetch(url.toString(), opts)
                if (!secondResponse.ok) {
                    let error: GapiErrorResponse = await response.json()
                    throw new SyncerError(JSON.stringify(error), `Failed to update row: ${range}`, response.status === 401)
                } else {
                    return payload
                }
            }
            throw new SyncerError(JSON.stringify(data), `Failed to update row: ${range}`, response.status === 401)
        }
        return payload
    }

    public async deleteRow<P extends DeleteRowPayload>(token: string, payload: P): Promise<P> {
        let range = { sheetId: payload.sheetId, startRowIndex: payload.idx, endRowIndex: payload.idx + 1, startColumnIndex: 0 }
        let url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${payload.spreadsheetId}:batchUpdate`)
        let headers = { Authorization: `Bearer ${token}` }
        let body = JSON.stringify({ requests: [{ deleteRange: { range: range, shiftDimension: "ROWS" } }] })
        let opts: RequestInit = { method: "POST", cache: "no-cache", headers: headers, body: body }
        let response = await fetch(url.toString(), opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(JSON.stringify(error), `Failed to delete row: ${payload.idx}`, response.status === 401)
        }
        return payload
    }

    // TODO: public async moveRow
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
