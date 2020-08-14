import { TestMode } from "./testing"

export type SyncerPayload = (
    GetRowsPayload | GetSpreadsheetPayload | UpdateRowPayload |
    ExtendSheetPayload | DeleteRowPayload | TestModeUpdatePayload | AuthUpdatePayload |
    UnpausePayload | SyncStatePayload | ErrorPayload | TokenRequestPayload
)

export enum SyncerPayloadType {
    AUTH_UPDATE,
    DELETE_ROW,
    UPDATE_ROW,
    GET_ROWS,
    TEST_MODE_UPDATE,
    UNPAUSE,
    GET_SPREADSHEET,
    EXTEND_SHEET,
    CREATE_ROW,
    MOVE_ROW,
    ERROR,
    TOKEN_REQUEST,
    SYNC_STATE,
}

export enum SyncerResponseType {
    SYNCER_STATE,
    ERROR,
    REAUTH,
}

export enum SyncerState {
    PAUSED = "cloud_off",
    UPLOADING = "cloud_upload",
    DOWNLOADING = "cloud_download",
    SYNCED = "cloud_done",
    INITIALIZING = "cloud_queue",
}

export interface TestModeUpdatePayload {
    type: SyncerPayloadType.TEST_MODE_UPDATE
    testMode: TestMode
}

export interface AuthUpdatePayload {
    type: SyncerPayloadType.AUTH_UPDATE
    token: string
}

export interface UnpausePayload {
    type: SyncerPayloadType.UNPAUSE
}

export interface DeleteRowPayload {
    type: SyncerPayloadType.DELETE_ROW
    idx: number
    spreadsheetId: string
    sheetId: number
}

export interface ExtendSheetPayload {
    type: SyncerPayloadType.EXTEND_SHEET
    spreadsheetId: string
    sheetId: number
}

export interface UpdateRowPayload {
    type: SyncerPayloadType.UPDATE_ROW
    idx: number
    spreadsheetId: string
    sheetId: number
    sheetTitle: string
    content: string
}

export interface GetSpreadsheetPayload {
    type: SyncerPayloadType.GET_SPREADSHEET
    spreadsheetId: string
    spreadsheet?: gapi.client.sheets.Spreadsheet
}

export interface GetRowsPayload {
    type: SyncerPayloadType.GET_ROWS
    spreadsheetId: string
    sheetId: number
    sheetTitle: string
    rows: string[]
}

export interface SyncStatePayload {
    type: SyncerPayloadType.SYNC_STATE
    length: number
    state: SyncerState
}

export interface ErrorPayload {
    type: SyncerPayloadType.ERROR
    error: Error
    pause: boolean
    friendlyMsg: string
}

export interface TokenRequestPayload {
    type: SyncerPayloadType.TOKEN_REQUEST
}
