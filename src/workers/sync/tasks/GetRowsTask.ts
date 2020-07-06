import { SyncerError } from ".."
import { BaseTask } from "./BaseTask"
import { GapiErrorResponse, GetRowsPayload } from "../../../types"

export class GetRowsTask<P extends GetRowsPayload> extends BaseTask<P> {
    constructor(payload: P) { super(payload) }

    public async work(token: string): Promise<P> {
        let range = `${this.payload.sheetTitle}!A:A`
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}/values/${range}`
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
            this.payload.rows = (data.values) ? data.values.map(row => row[0]) : []
        }
        return this.payload
    }
}
