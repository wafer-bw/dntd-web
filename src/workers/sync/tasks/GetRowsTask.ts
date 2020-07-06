import { SyncerError } from ".."
import { BaseTask } from "./BaseTask"
import { GapiErrorResponse, GetRowsPayload, TestMode } from "../../../types"

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

export class MockGetRowsTask<P extends GetRowsPayload> extends BaseTask<P> {
    constructor(payload: P) { super(payload) }

    public async work(_token: string): Promise<P> {
        if (this.testMode === TestMode.FAIL_GET_RANGE) {
            throw new Error("mock fail")
        } else if (this.testMode === TestMode.RETURN_ROWS) {
            this.payload.rows = ["aaa", "bbb", "ccc", "@tag", "@key:value"]
        }
        return this.payload
    }
}
