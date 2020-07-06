import { SyncerError } from ".."
import { BaseTask } from "./BaseTask"
import { GapiErrorResponse, GetSpreadsheetPayload } from "../../../types"

export class GetSpreadsheetTask<P extends GetSpreadsheetPayload> extends BaseTask<P> {
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
            this.payload.spreadsheet = await response.json()
        }
        return this.payload
    }
}
