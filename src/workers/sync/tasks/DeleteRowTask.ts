import { SyncerError } from ".."
import { BaseTask } from "./BaseTask"
import { GapiErrorResponse, DeleteRowPayload, TestMode } from "../../../types"

export function createDeleteRowTask<P extends DeleteRowPayload>(payload: P, testMode: TestMode): BaseTask<P> | undefined {
    return (testMode === TestMode.OFF)
        ? new DeleteRowTask(payload)
        : undefined // new MockDeleteRowTask(payload, testMode) // TODO
}

export class DeleteRowTask<P extends DeleteRowPayload> extends BaseTask<P> {
    constructor(payload: P) { super(payload) }

    public async work(token: string): Promise<P> {
        let range = { sheetId: this.payload.sheetId, startRowIndex: this.payload.idx, endRowIndex: this.payload.idx + 1, startColumnIndex: 0 }
        let url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`)
        let headers = { Authorization: `Bearer ${token}` }
        let body = JSON.stringify({ requests: [{ deleteRange: { range: range, shiftDimension: "ROWS" } }] })
        let opts: RequestInit = { method: "POST", cache: "no-cache", headers: headers, body: body }
        let response = await fetch(url.toString(), opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(JSON.stringify(error), `Failed to delete row: ${this.payload.idx}`, response.status === 401)
        }
        return this.payload
    }
}