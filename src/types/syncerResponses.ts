export type SyncerResponse = (
    RowsResponse | SheetsResponse | QueueStateResponse | ErrorResponse | ReauthResponse
)

export enum SyncerResponseType {
    ROWS,
    SHEETS,
    QUEUE_STATE,
    ERROR,
    REAUTH,
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
    type: SyncerResponseType.QUEUE_STATE
    length: number
    paused: boolean
}

export interface ErrorResponse {
    type: SyncerResponseType.ERROR
    error: Error
}

export interface ReauthResponse {
    type: SyncerResponseType.REAUTH
}
