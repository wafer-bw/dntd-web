import { SyncerTaskPayload, TestMode, SyncerPayloadType } from "../../../types"
import {
    createGetRowsTask, createGetSpreadsheetTask, createGetSheetsTask,
    createDeleteRowTask, createUpdateRowTask
} from "."

export class TaskFactory {
    public createTask(payload: SyncerTaskPayload, testMode: TestMode): BaseTask<SyncerTaskPayload> | undefined {
        switch(payload.type) {
            case SyncerPayloadType.GET_ROWS:
                return createGetRowsTask(payload, testMode)
            case SyncerPayloadType.GET_SPREADSHEET:
                return createGetSpreadsheetTask(payload, testMode)
            case SyncerPayloadType.GET_SHEETS:
                return createGetSheetsTask(payload, testMode)
            case SyncerPayloadType.DELETE_ROW:
                return createDeleteRowTask(payload, testMode)
            case SyncerPayloadType.UPDATE_ROW:
                return createUpdateRowTask(payload, testMode)
            // case SyncerPayloadType.CREATE_ROW:
            //     return undefined // TODO
            // case SyncerPayloadType.MOVE_ROW:
            //     return undefined // TODO
            default:
                return undefined
        }
        return
    }

}

export abstract class BaseTask<P extends SyncerTaskPayload> {
    public payload: P
    public async: boolean | undefined
    public testMode: TestMode = TestMode.OFF

    constructor(payload: P, testMode?: TestMode) {
        this.payload = payload
        this.testMode = (testMode !== undefined) ? testMode : this.testMode
    }

    public abstract work(token: string): Promise<P>
}
