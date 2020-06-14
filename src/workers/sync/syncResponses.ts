import { SyncerError } from "."
import { 
    SyncerResponse, SyncerResponseType, GetRowsTask, GetSheetsTask
} from "../../types"

export function postSheets(task: GetSheetsTask, sheets: gapi.client.sheets.Sheet[]) {
    postResponse({
        spreadsheetId: task.spreadsheetId,
        sheets: sheets,
        type: SyncerResponseType.SHEETS
    })
}

export function postRows(task: GetRowsTask, rows: string[]) {
    postResponse({
        spreadsheetId: task.spreadsheetId,
        sheetId: task.sheetId,
        rows: rows,
        type: SyncerResponseType.ROWS
    })
}

export function postQueueState(length: number, paused: boolean) {
    postResponse({
        length: length,
        paused: paused,
        type: SyncerResponseType.QUEUE_STATE
    })
}

export function postError(error: Error | SyncerError) {
    postResponse({
        error: error,
        type: SyncerResponseType.ERROR
    })
}

export function postReAuthRequest() {
    postMessage({ type: SyncerResponseType.REAUTH })
}

function postResponse(response: SyncerResponse) {
    postMessage(response)
}
