import { SyncerState, SyncerTaskPayload, TestMode, SyncerPayloadType } from "../../types"
import {
    postQueueState, postError,
    postReAuthRequest, instanceOfSyncerError, SyncerError
} from "."
import { TaskFactory, BaseTask } from "./tasks"

const syncRate = 250 // ms
let paused: boolean = false
let testMode: TestMode = TestMode.OFF
const taskFactory = new TaskFactory()
let token: string | undefined = undefined
const parallelQueue: Map<string, BaseTask<SyncerTaskPayload>> = new Map()
const seriesQueue: { id: string, task: BaseTask<SyncerTaskPayload> }[] = []

console.log("worker running")
sync()
onmessage = (msg) => prequeue(msg)

function prequeue(msg: MessageEvent) {
    const { id, payload }: { id: string, payload: SyncerTaskPayload } = msg.data

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
    if (task === undefined) {
        return
    }

    if (task.async) {
        parallelQueue.set(id, task)
    } else {
        seriesQueue.push({ id, task })
    }
}

async function sync() {
    while (true) {
        await sleep(syncRate)
        if (!paused && seriesQueue.length === 0 && parallelQueue.size === 0) {
            postQueueState(seriesQueue.length, SyncerState.SYNCED)
        }
        try {
            workParallelQueueTasks()
            await workSeriesQueueTasks()
        } catch (e) {
            if (instanceOfSyncerError(e) && e.needsReAuth) {
                postReAuthRequest()
                token = undefined
            } else {
                paused = true
                postQueueState(seriesQueue.length, SyncerState.PAUSED)
                postError((instanceOfSyncerError(e))
                    ? e
                    : new SyncerError(e.message, "Unknown Error", false))
            }
        }
    }
}

async function workSeriesQueueTasks() {
    while (seriesQueue.length !== 0 && token && !paused) {
        let { id, task } = seriesQueue[0]
        let payload = await task.work(token)
        postMessage({ id, payload })
        seriesQueue.shift()
    }
}

function workParallelQueueTasks() {
    if (parallelQueue.size === 0 || !token || paused) {
        return
    }
    for (let [id, task] of parallelQueue.entries()) {
        parallelQueue.delete(id)
        task.work(token).then((payload: SyncerTaskPayload) => {
            postMessage({ id, payload })
        }).catch((error: Error) => {
            parallelQueue.set(id, task)
            throw error
        })
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
