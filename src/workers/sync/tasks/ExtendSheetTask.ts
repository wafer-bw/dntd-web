import { SyncerError } from ".."
import { BaseTask } from "./BaseTask"
import { GapiErrorResponse, ExtendSheetPayload } from "../../../types"

export class ExtendSheetTask<P extends ExtendSheetPayload> extends BaseTask<P> {
    constructor(payload: P) {
        super(payload)
    }

    public async work(token: string): Promise<P> {
        let extendSheetLength = 100
        let url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`)
        let headers = { Authorization: `Bearer ${token}` }
        let body = JSON.stringify({ requests: [{ appendDimension: { sheetId: this.payload.sheetId, dimension: "ROWS", length: extendSheetLength } }] })
        let opts: RequestInit = { method: "POST", mode: "cors", cache: "no-cache", headers: headers, body: body }
        let response = await fetch(url.toString(), opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(JSON.stringify(error), "Failed to extend sheet", response.status === 401)
        }
        return this.payload
    }
}
