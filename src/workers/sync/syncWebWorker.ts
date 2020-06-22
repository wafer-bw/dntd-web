import { SyncerTasksMock } from "../../mocks"
import { TestMode, SyncerTask, SyncerTaskType } from "../../types"
import {
    SyncerTasks, postQueueState, postRows, postSheets, syncRate, sleep, postError,
    postReAuthRequest, instanceOfSyncerError
} from "."

const queue: any[] = []
let paused: boolean = false
let token: string | null = null
let syncerTasks: SyncerTasks | SyncerTasksMock | null = null

sync()
onmessage = (msg) => prequeue(msg)

function prequeue(msg: MessageEvent) {
    let task: SyncerTask = msg.data
    switch (task.type) {
        case SyncerTaskType.TEST_MODE_UPDATE:
            if (task.testMode === TestMode.OFF) {
                syncerTasks = new SyncerTasks()
            } else {
                token = "mock"
                syncerTasks = new SyncerTasksMock(task.testMode)
            }
            break
        case SyncerTaskType.AUTH_UPDATE:
            token = task.token
            break
        case SyncerTaskType.UNPAUSE:
            paused = false
            break
        default:
            queue.push(task)
            break
    }
}

async function sync() {
    while (true) {
        await sleep(syncRate)
        postQueueState(queue.length, paused)
        while (queue.length > 0 && token && !paused && syncerTasks) {
            let task: SyncerTask = queue[0]
            try {
                switch (task.type) {
                    case SyncerTaskType.GET_ROWS:
                        postRows(task, await syncerTasks!.getRows(token!, task))
                        break
                    case SyncerTaskType.GET_SHEETS:
                        postSheets(task, await syncerTasks!.getSheets(token!, task))
                        break
                    case SyncerTaskType.UPDATE_ROW:
                        await syncerTasks!.updateRow(token!, task)
                        break
                    case SyncerTaskType.DELETE_ROW:
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
                    postError(e)
                    break
                }
            }
        }
    }
}
