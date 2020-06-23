import { SyncerError } from "../workers/sync"

export type SyncerResponse = (
    RowsResponse | SheetsResponse | QueueStateResponse | ErrorResponse | ReauthResponse
)

export enum SyncerResponseType {
    ROWS,
    SHEETS,
    SYNCER_STATE,
    ERROR,
    REAUTH,
}

export enum SyncerState {
    PAUSED = "cloud_off",
    UPLOADING = "cloud_upload",
    DOWNLOADING = "cloud_download",
    SYNCED = "cloud_done",
}

export interface RowsResponse {
    type: SyncerResponseType.ROWS
    spreadsheetId: string
    sheetId: number
    rows: string[]
}

export interface SheetsResponse {
    type: SyncerResponseType.SHEETS
    spreadsheetId: string
    sheets: gapi.client.sheets.Sheet[]
}

export interface QueueStateResponse {
    type: SyncerResponseType.SYNCER_STATE
    length: number
    state: SyncerState
}

export interface ErrorResponse {
    type: SyncerResponseType.ERROR
    error: SyncerError | Error
    friendlyMsg: string
}

export interface ReauthResponse {
    type: SyncerResponseType.REAUTH
}
