import { SyncerError } from ".."
import { BaseTask } from "./BaseTask"
import { GapiErrorResponse, GetSheetsPayload } from "../../../types"

export class GetSheetsTask<P extends GetSheetsPayload> extends BaseTask<P> {
    constructor(payload: P) { super(payload) }

    public async work(token: string): Promise<P> {
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}`
        let headers = { Authorization: `Bearer ${token}` }
        let opts: RequestInit = { method: "GET", cache: "no-cache", headers: headers }
        let response = await fetch(url, opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(
                JSON.stringify(error),
                `Failed to get spreadsheet details for spreadsheet: ${this.payload.spreadsheetId}`,
                response.status === 401
            )
        } else {
            let data: gapi.client.sheets.Spreadsheet = await response.json()
            this.payload.sheets = (data.sheets) ? data.sheets : []
        }
        return this.payload
    }
}
