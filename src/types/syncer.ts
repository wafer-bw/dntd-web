import { TestMode } from "."

export type SyncerPayload = (
    GetRowsPayload | GetSpreadsheetPayload | UpdateRowPayload |
    ExtendSheetPayload | DeleteRowPayload | TestModeUpdatePayload |
    AuthUpdatePayload | UnpausePayload | SyncStatePayload | ErrorPayload |
    TokenRequestPayload | CreateRowPayload
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
    rejects: boolean
}

export interface AuthUpdatePayload {
    type: SyncerPayloadType.AUTH_UPDATE
    token: string
    rejects: boolean
}

export interface UnpausePayload {
    type: SyncerPayloadType.UNPAUSE
    rejects: boolean
}

export interface DeleteRowPayload {
    type: SyncerPayloadType.DELETE_ROW
    idx: number
    spreadsheetId: string
    sheetId: number
    rejects: boolean
}

export interface CreateRowPayload {
    type: SyncerPayloadType.CREATE_ROW
    idx: number
    spreadsheetId: string
    sheetId: number
    rejects: boolean
}

export interface ExtendSheetPayload {
    type: SyncerPayloadType.EXTEND_SHEET
    spreadsheetId: string
    sheetId: number
    rejects: boolean
}

export interface UpdateRowPayload {
    type: SyncerPayloadType.UPDATE_ROW
    idx: number
    spreadsheetId: string
    sheetId: number
    sheetTitle: string
    content: string
    rejects: boolean
}

export interface GetSpreadsheetPayload {
    type: SyncerPayloadType.GET_SPREADSHEET
    spreadsheetId: string
    spreadsheet?: gapi.client.sheets.Spreadsheet
    rejects: boolean
}

export interface GetRowsPayload {
    type: SyncerPayloadType.GET_ROWS
    spreadsheetId: string
    sheetId: number
    sheetTitle: string
    rows: string[]
    rejects: boolean
}

export interface SyncStatePayload {
    type: SyncerPayloadType.SYNC_STATE
    length: number
    state: SyncerState
    rejects: boolean
}

export interface ErrorPayload {
    type: SyncerPayloadType.ERROR
    error: Error
    pause: boolean
    friendlyMsg: string
    rejects: boolean
}

export interface TokenRequestPayload {
    type: SyncerPayloadType.TOKEN_REQUEST
    rejects: boolean
}
