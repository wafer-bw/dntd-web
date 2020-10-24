import { BaseTask } from "./BaseTask"
import { CreateRowPayload, TestMode } from "../../../types"
import { SyncerError, GapiErrorResponse } from "../../../errors"

export function createCreateRowTask<P extends CreateRowPayload>(payload: P, testMode: TestMode): BaseTask<P> | undefined {
    return (testMode === TestMode.OFF)
        ? new CreateRowTask(payload)
        : new MockCreateRowTask(payload, testMode)
}

export class CreateRowTask<P extends CreateRowPayload> extends BaseTask<P> {
    constructor(payload: P) {
        super(payload)
    }

    public async work(token: string): Promise<P> {
        let range = { sheetId: this.payload.sheetId, startIndex: this.payload.idx, endIndex: this.payload.idx + 1, dimension: "ROWS" }
        let url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`)
        let headers = { Authorization: `Bearer ${token}` }
        let body = JSON.stringify({ requests: [{ insertDimension: { range: range } }] })
        let opts: RequestInit = { method: "POST", cache: "no-cache", headers: headers, body: body }
        let response = await fetch(url.toString(), opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(JSON.stringify(error), "Failed to create new entry", response.status === 401)
        }
        return this.payload
    }
}

export class MockCreateRowTask<P extends CreateRowPayload> extends BaseTask<P> {
    constructor(payload: P, testMode: TestMode) {
        super(payload, testMode)
    }

    public async work(_token: string): Promise<P> {
        if (this.testMode === TestMode.FAIL_DELETE_ROW) {
            let error = new Error("mock fail")
            throw new SyncerError(JSON.stringify(error), "Failed to create new entry", false)
        }
        return this.payload
    }
}
