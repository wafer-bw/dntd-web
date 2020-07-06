import { SyncerTasksMock } from "../../mocks"
import { SyncerState, SyncerTaskPayload, TestMode, SyncerPayloadType } from "../../types"
import {
    SyncerTasks, postQueueState, postRows, postSheets, syncRate, sleep, postError,
    postReAuthRequest, instanceOfSyncerError, SyncerError
} from "."
import { TaskFactory } from "./tasks"

const queue: any[] = []
let paused: boolean = false
let token: string | undefined = undefined
let testMode: TestMode = TestMode.OFF
let syncerTasks: SyncerTasks | SyncerTasksMock | null = null
const taskFactory = new TaskFactory()

sync()
onmessage = (msg) => prequeue(msg)

function prequeue(msg: MessageEvent) {
    const { id, payload }: { id: string, payload: SyncerTaskPayload } = msg.data
    // Handle non-tasked work
    if (payload.type === SyncerPayloadType.TEST_MODE_UPDATE) {
        testMode = payload.testMode
        if (testMode !== TestMode.OFF) {
            token = "mock"
        }
    } else if (payload.type === SyncerPayloadType.AUTH_UPDATE) {
        token = payload.token
    } else if (payload.type === SyncerPayloadType.UNPAUSE) {
        paused = false
    }

    let task = taskFactory.createTask(payload, testMode)

    if (task === undefined) { return }

    // place task and task id in series or parallel queue to be worked

    task.work(token) // TODO: RELOCATE
        .then((payload: any) => { postMessage({ id, payload }) })
        .catch((error: Error) => { postMessage({ id, error }) })
}

async function sync() {
    while (true) {
        await sleep(syncRate)
        while (queue.length > 0 && token && !paused && syncerTasks) {
            let task: SyncerTask = queue[0]
            try {
                // switch (task.type) {
                //     case SyncerTaskType.GET_ROWS:
                //         postQueueState(queue.length, SyncerState.DOWNLOADING)
                //         postRows(task, await syncerTasks!.getRows(token!, task))
                //         break
                //     case SyncerTaskType.GET_SHEETS:
                //         postQueueState(queue.length, SyncerState.DOWNLOADING)
                //         postSheets(task, await syncerTasks!.getSheets(token!, task))
                //         break
                //     case SyncerTaskType.UPDATE_ROW:
                //         postQueueState(queue.length, SyncerState.UPLOADING)
                //         await syncerTasks!.updateRow(token!, task)
                //         break
                //     case SyncerTaskType.DELETE_ROW:
                //         postQueueState(queue.length, SyncerState.UPLOADING)
                //         await syncerTasks!.deleteRow(token!, task)
                //         break
                // }
                queue.shift()
            } catch (e) {
                if (instanceOfSyncerError(e) && e.needsReAuth) {
                    postReAuthRequest()
                    token = null
                    break
                } else {
                    paused = true
                    postQueueState(queue.length, SyncerState.PAUSED)
                    postError((instanceOfSyncerError(e))
                        ? e
                        : new SyncerError(e.message, "Unknown Error", false))
                    break
                }
            }
            if (!paused && queue.length === 0) {
                postQueueState(queue.length, SyncerState.SYNCED)
            }
        }
    }
}
