import { SyncerTaskPayload, TestMode, SyncerPayloadType } from "../../../types"
import { GetRowsTask, MockGetRowsTask, GetSpreadsheetTask } from "."

export class TaskFactory {
    public createTask(payload: SyncerTaskPayload, testMode: TestMode): BaseTask<SyncerTaskPayload> | undefined {
        switch(payload.type) {
            case SyncerPayloadType.GET_ROWS:
                return (testMode === TestMode.OFF)
                    ? new GetRowsTask(payload)
                    : new MockGetRowsTask(payload)
        }
        switch(payload.type) {
            case SyncerPayloadType.GET_SPREADSHEET:
                return (testMode === TestMode.OFF)
                    ? new GetSpreadsheetTask(payload)
                    : undefined // new MockGetSpreadsheetTask(payload) // TODO
        }
        return
    }

}

export abstract class BaseTask<P extends SyncerTaskPayload> {
    public payload: P
    public testMode: TestMode = TestMode.OFF

    constructor(payload: P, testMode?: TestMode) {
        this.payload = payload
        this.testMode = (testMode !== undefined) ? testMode : this.testMode
    }

    public abstract work(token: string): Promise<P>
}
