import { SyncerError } from ".."
import { BaseTask } from "./BaseTask"
import { GapiErrorResponse, UpdateRowPayload, SyncerTaskPayload, TestMode, SyncerPayloadType } from "../../../types"
import { ExtendSheetTask } from "./ExtendSheetTask"

export function createUpdateRowTask<P extends UpdateRowPayload>(payload: P, testMode: TestMode): BaseTask<P> | undefined {
    return (testMode === TestMode.OFF)
        ? new UpdateRowTask(payload)
        : undefined // new MockUpdateRowTask(payload, testMode) // TODO
}

export class UpdateRowTask<P extends UpdateRowPayload> extends BaseTask<P> {
    constructor(payload: P) { super(payload) }

    public async work(token: string): Promise<P> {
        let range = `${this.payload.sheetTitle}!A${this.payload.idx + 1}:A${this.payload.idx + 1}`
        let url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}/values/${range}`)
        let headers = { Authorization: `Bearer ${token}` }
        let params: Record<string, string> = { valueInputOption: "RAW" }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        let body = JSON.stringify({ range: range, majorDimension: "ROWS", values: [[this.payload.content]] })
        let opts: RequestInit = { method: "PUT", cache: "no-cache", headers: headers, body: body }
        let response = await fetch(url.toString(), opts)
        let data = await response.json()
        if (!response.ok) {
            if (data.error.message.includes("exceeds grid limits")) {
                let extendSheetTask: SyncerTaskPayload = {
                    type: SyncerPayloadType.EXTEND_SHEET,
                    spreadsheetId: this.payload.spreadsheetId,
                    sheetId: this.payload.sheetId
                }
                await new ExtendSheetTask(extendSheetTask).work(token)
                let secondResponse = await fetch(url.toString(), opts)
                if (!secondResponse.ok) {
                    let error: GapiErrorResponse = await response.json()
                    throw new SyncerError(JSON.stringify(error), `Failed to update row: ${range}`, response.status === 401)
                } else {
                    return this.payload
                }
            }
            throw new SyncerError(JSON.stringify(data), `Failed to update row: ${range}`, response.status === 401)
        }
        return this.payload
    }
}
