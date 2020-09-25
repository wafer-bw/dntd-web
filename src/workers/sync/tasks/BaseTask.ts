import { SyncerPayload, TestMode, SyncerPayloadType } from "../../../types"
import {
    createGetRowsTask, createGetSpreadsheetTask, createDeleteRowTask,
    createUpdateRowTask, createCreateRowTask
} from "."

export class TaskFactory {
    public createTask(payload: SyncerPayload, testMode: TestMode): BaseTask<SyncerPayload> | undefined {
        switch(payload.type) {
            case SyncerPayloadType.CREATE_ROW:
                return createCreateRowTask(payload, testMode)
            case SyncerPayloadType.GET_ROWS:
                return createGetRowsTask(payload, testMode)
            case SyncerPayloadType.GET_SPREADSHEET:
                return createGetSpreadsheetTask(payload, testMode)
            case SyncerPayloadType.UPDATE_ROW:
                return createUpdateRowTask(payload, testMode)
            case SyncerPayloadType.DELETE_ROW:
                return createDeleteRowTask(payload, testMode)
            // TODO - NICE TO HAVE
            // case SyncerPayloadType.MOVE_ROW:
            //     return undefined
            default:
                console.warn("Task factory told to build unsupported task")
                return undefined
        }
        return
    }

}

export abstract class BaseTask<P extends SyncerPayload> {
    public payload: P
    public async: boolean | undefined
    public testMode: TestMode = TestMode.OFF

    constructor(payload: P, testMode?: TestMode) {
        this.payload = payload
        this.testMode = (testMode !== undefined) ? testMode : this.testMode
    }

    public abstract work(token: string): Promise<P>
}
