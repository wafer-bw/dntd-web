import { SyncerTasksMock } from "../../mocks"
import { TestMode, SyncerTask } from "../../types"
import {
    instanceOfAuthUpdateTask, instanceOfGetRowsTask, instanceOfUpdateRowTask,
    instanceOfDeleteRowTask, instanceOfGetSheetsTask, instanceOfTestModeUpdateTask,
    SyncerTasks, postQueueState, postRows, postSheets, syncRate, sleep, postError,
    postReAuthRequest, instanceOfUnpauseTask, instanceOfSyncerError
} from "."

const queue: any[] = []
let paused: boolean = false
let token: string | null = null
let syncerTasks: SyncerTasks | SyncerTasksMock | null = null

sync()

onmessage = (msg) => {
    let task: SyncerTask = msg.data
    if (instanceOfTestModeUpdateTask(task)) {
        syncerTasks = (task.testMode === TestMode.OFF)
            ? new SyncerTasks()
            : new SyncerTasksMock(task.testMode)
    } else if (instanceOfAuthUpdateTask(task)) {
        token = task.token
    } else if (instanceOfUnpauseTask(task)) {
        paused = false
    } else {
        queue.push(task)
    }
}

async function sync() {
    while (true) {
        await sleep(syncRate)
        postQueueState(queue.length, paused)
        while (queue.length > 0 && token && !paused && syncerTasks) {
            let task: SyncerTask = queue[0]
            try {
                if (instanceOfGetRowsTask(task)) {
                    postRows(task, await syncerTasks!.getRows(token!, task))
                } else if (instanceOfGetSheetsTask(task)) {
                    postSheets(task, await syncerTasks!.getSheets(token!, task))
                } else if (instanceOfUpdateRowTask(task)) {
                    await syncerTasks!.updateRow(token!, task)
                } else if (instanceOfDeleteRowTask(task)) {
                    await syncerTasks!.deleteRow(token!, task)
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
