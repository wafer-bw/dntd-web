import { BaseTask } from "./BaseTask"
import { SyncerError, GapiErrorResponse, GetSpreadsheetPayload, TestMode } from "../../../types"

export function createGetSpreadsheetTask<P extends GetSpreadsheetPayload>(payload: P, testMode: TestMode): BaseTask<P> | undefined {
    return (testMode === TestMode.OFF)
        ? new GetSpreadsheetTask(payload)
        : new MockGetSpreadsheetTask(payload, testMode)
}

export class GetSpreadsheetTask<P extends GetSpreadsheetPayload> extends BaseTask<P> {
    constructor(payload: P) {
        super(payload)
        this.async = true
    }

    public async work(token: string): Promise<P> {
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}`
        let headers = { Authorization: `Bearer ${token}` }
        let opts: RequestInit = { method: "GET", cache: "no-cache", headers: headers }
        let response = await fetch(url, opts)
        if (!response.ok) {
            let error: GapiErrorResponse = await response.json()
            throw new SyncerError(
                JSON.stringify(error),
                `Error: Could not download spreadsheet.`,
                response.status === 401,
                false
            )
        } else {
            this.payload.spreadsheet = await response.json()
        }
        console.log(JSON.stringify(this.payload))
        return this.payload
    }
}

export class MockGetSpreadsheetTask<P extends GetSpreadsheetPayload> extends BaseTask<P> {
    constructor(payload: P, testMode: TestMode) {
        super(payload, testMode)
        this.async = true
    }

    public async work(_token: string): Promise<P> {
        if (this.testMode === TestMode.FAIL_GET_SPREADSHEET_SHEETS) {
            throw new Error("mock fail")
        }
        this.payload.spreadsheet = {
            "spreadsheetId": this.payload.spreadsheetId,
            "spreadsheetUrl": `https://docs.google.com/spreadsheets/d/${this.payload.spreadsheetId}/edit`,
            "properties": {
                "title": "Mock Journal",
            },
            "sheets": [
                {
                    "properties": {
                        "sheetId": 0,
                        "title": "Sheet1",
                    }
                },
                {
                    "properties": {
                        "sheetId": 1124780423,
                        "title": "Sheet2",
                    }
                },
                {
                    "properties": {
                        "sheetId": 1286561930,
                        "title": "Sheet3",
                    }
                }
            ]
        }
        console.log("returning payload")
        return this.payload
    }
}