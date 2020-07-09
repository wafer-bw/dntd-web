import { TestMode } from "./testing"
import { Spreadsheet } from "../classes"

export type SyncerTaskPayload = (
    GetRowsPayload | GetSheetsPayload | GetSpreadsheetPayload | UpdateRowPayload |
    ExtendSheetPayload | DeleteRowPayload | TestModeUpdatePayload | AuthUpdatePayload |
    UnpausePayload
)

export enum SyncerPayloadType {
    AUTH_UPDATE,
    DELETE_ROW,
    UPDATE_ROW,
    GET_ROWS,
    GET_SHEETS,
    TEST_MODE_UPDATE,
    UNPAUSE,
    GET_SPREADSHEET,
    EXTEND_SHEET,
    CREATE_ROW,
    MOVE_ROW,
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
    spreadsheet?: Spreadsheet
}

export interface GetRowsPayload {
    type: SyncerPayloadType.GET_ROWS
    spreadsheetId: string
    sheetId: number
    sheetTitle: string
    rows: string[]
}

export interface GetSheetsPayload {
    type: SyncerPayloadType.GET_SHEETS
    spreadsheetId: string
    sheets: gapi.client.sheets.Sheet[]
}
