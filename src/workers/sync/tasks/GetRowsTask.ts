import { BaseTask } from "./BaseTask"
import { GetRowsPayload, TestMode } from "../../../types"
import { SyncerError, GapiErrorResponse } from "../../../errors"

export function createGetRowsTask<P extends GetRowsPayload>(payload: P, testMode: TestMode): BaseTask<P> {
    return (testMode === TestMode.OFF)
        ? new GetRowsTask(payload)
        : new MockGetRowsTask(payload, testMode)
}

export class GetRowsTask<P extends GetRowsPayload> extends BaseTask<P> {
    constructor(payload: P) {
        super(payload)
        this.async = true
    }

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
    constructor(payload: P, testMode: TestMode) {
        super(payload, testMode)
        this.async = true
    }

    public async work(_token: string): Promise<P> {
        if (this.testMode === TestMode.FAIL_GET_RANGE) {
            throw new Error("mock fail")
        }
        if (this.testMode === TestMode.RETURN_ROWS) {
            this.payload.rows = ["aaa", "bbb", "ccc", "@tag", "@key:value"]
        }
        return this.payload
    }
}
