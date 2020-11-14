import { SyncerError } from "."
import { 
    SyncerResponse, SyncerResponseType, GetRowsTask, GetSheetsTask, SyncerState
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

export function postQueueState(length: number, state: SyncerState) {
    postResponse({
        length: length,
        state: state,
        type: SyncerResponseType.SYNCER_STATE
    })
}

export function postError(error: SyncerError) {
    postResponse({
        friendlyMsg: error.friendlyMsg,
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
