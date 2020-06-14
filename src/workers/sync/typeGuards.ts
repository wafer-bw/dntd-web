import { SyncerError } from "."
import {
    SyncerTask, AuthUpdateTask, SyncerTaskType, GetRowsTask, UpdateRowTask,
    DeleteRowTask,SyncerResponse, RowsResponse, SyncerResponseType,
    SheetsResponse, QueueStateResponse, GetSheetsTask, TestModeUpdateTask,
    ErrorResponse, UnpauseTask, ReauthResponse
} from "../../types"

export function instanceOfSyncerError(error: Error | SyncerError): error is SyncerError {
    return "needsReAuth" in error
}

export function instanceOfRowsResponse(response: SyncerResponse): response is RowsResponse {
    return "type" in response && response.type === SyncerResponseType.ROWS
}

export function instanceOfSheetsResponse(response: SyncerResponse): response is SheetsResponse {
    return "type" in response && response.type === SyncerResponseType.SHEETS
}

export function instanceOfQueueStateResponse(response: SyncerResponse): response is QueueStateResponse {
    return "type" in response && response.type === SyncerResponseType.QUEUE_STATE
}

export function instanceOfErrorResponse(response: SyncerResponse): response is ErrorResponse {
    return "type" in response && response.type === SyncerResponseType.ERROR
}

export function instanceOfReauthResponse(response: SyncerResponse): response is ReauthResponse {
    return "type" in response && response.type === SyncerResponseType.REAUTH
}

export function instanceOfGetSheetsTask(task: SyncerTask): task is GetSheetsTask {
    return "type" in task && task.type === SyncerTaskType.GET_SHEETS
}

export function instanceOfAuthUpdateTask(task: SyncerTask): task is AuthUpdateTask {
    return "type" in task && task.type === SyncerTaskType.AUTH_UPDATE
}

export function instanceOfGetRowsTask(task: SyncerTask): task is GetRowsTask {
    return "type" in task && task.type === SyncerTaskType.GET_ROWS
}

export function instanceOfUpdateRowTask(task: SyncerTask): task is UpdateRowTask {
    return "type" in task && task.type === SyncerTaskType.UPDATE_ROW
}

export function instanceOfDeleteRowTask(task: SyncerTask): task is DeleteRowTask {
    return "type" in task && task.type === SyncerTaskType.DELETE_ROW
}

export function instanceOfTestModeUpdateTask(task: SyncerTask): task is TestModeUpdateTask {
    return "type" in task && task.type === SyncerTaskType.TEST_MODE_UPDATE
}

export function instanceOfUnpauseTask(task: SyncerTask): task is UnpauseTask {
    return "type" in task && task.type === SyncerTaskType.UNPAUSE
}
