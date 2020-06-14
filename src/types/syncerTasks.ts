import { TestMode } from "./testing"

export type SyncerTask = AuthUpdateTask | DeleteRowTask | UpdateRowTask | GetRowsTask | GetSheetsTask | TestModeUpdateTask | UnpauseTask

export enum SyncerTaskType {
    AUTH_UPDATE,
    DELETE_ROW,
    UPDATE_ROW,
    GET_ROWS,
    GET_SHEETS,
    TEST_MODE_UPDATE,
    UNPAUSE
}

export interface GetSheetsTask {
    type: SyncerTaskType.GET_SHEETS
    spreadsheetId: string
}

export interface TestModeUpdateTask {
    type: SyncerTaskType.TEST_MODE_UPDATE
    testMode: TestMode
}

export interface AuthUpdateTask {
    type: SyncerTaskType.AUTH_UPDATE
    token: string
}

export interface DeleteRowTask {
    type: SyncerTaskType.DELETE_ROW
    idx: number
    spreadsheetId: string
    sheetId: number
}

export interface UpdateRowTask {
    type: SyncerTaskType.UPDATE_ROW
    idx: number
    spreadsheetId: string
    sheetId: number
    sheetTitle: string
    content: string
}

export interface GetRowsTask {
    type: SyncerTaskType.GET_ROWS
    spreadsheetId: string
    sheetId: number
    sheetTitle: string
}

export interface UnpauseTask {
    type: SyncerTaskType.UNPAUSE
}