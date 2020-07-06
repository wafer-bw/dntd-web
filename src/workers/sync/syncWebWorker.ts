import { SyncerTasksMock } from "../../mocks"
import { SyncerTask, SyncerTaskType, SyncerState } from "../../types"
import {
    SyncerTasks, postQueueState, postRows, postSheets, syncRate, sleep, postError,
    postReAuthRequest, instanceOfSyncerError, SyncerError
} from "."

const queue: any[] = []
let paused: boolean = false
let token: string | null = null
let syncerTasks: SyncerTasks | SyncerTasksMock | null = null

sync()
onmessage = (msg) => prequeue(msg)

function prequeue(msg: MessageEvent) {
    const { id, task }: { id: string, task: SyncerTask } = msg.data
    // turn task into object with .work()
    // place task in sync queue or do task async
    dowork(task) // TODO: relocate
        .then((task: any) => { postMessage({ id, task }) })
        .catch((error: Error) => { postMessage({ id, error }) })
}

async function dowork(task: any) {
    // Instead of directly raising errors they should be caught and sent back as a
    // separate message so the promise isn't terminated
    console.log("WORKING TASK:")
    console.log(task)
    return task
}

// function prequeue(msg: MessageEvent) {
//     let task: SyncerTask = msg.data
//     switch (task.type) {
//         case SyncerTaskType.TEST_MODE_UPDATE:
//             if (task.testMode === TestMode.OFF) {
//                 syncerTasks = new SyncerTasks()
//             } else {
//                 token = "mock"
//                 syncerTasks = new SyncerTasksMock(task.testMode)
//             }
//             break
//         case SyncerTaskType.AUTH_UPDATE:
//             token = task.token
//             break
//         case SyncerTaskType.UNPAUSE:
//             paused = false
//             break
//         case SyncerTaskType.GET_ROWS:
//             promisePrequeue(msg)
//             break
//         default:
//             queue.push(task)
//             break
//     }
// }

async function sync() {
    while (true) {
        await sleep(syncRate)
        while (queue.length > 0 && token && !paused && syncerTasks) {
            let task: SyncerTask = queue[0]
            try {
                switch (task.type) {
                    case SyncerTaskType.GET_ROWS:
                        postQueueState(queue.length, SyncerState.DOWNLOADING)
                        postRows(task, await syncerTasks!.getRows(token!, task))
                        break
                    case SyncerTaskType.GET_SHEETS:
                        postQueueState(queue.length, SyncerState.DOWNLOADING)
                        postSheets(task, await syncerTasks!.getSheets(token!, task))
                        break
                    case SyncerTaskType.UPDATE_ROW:
                        postQueueState(queue.length, SyncerState.UPLOADING)
                        await syncerTasks!.updateRow(token!, task)
                        break
                    case SyncerTaskType.DELETE_ROW:
                        postQueueState(queue.length, SyncerState.UPLOADING)
                        await syncerTasks!.deleteRow(token!, task)
                        break
                }
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
