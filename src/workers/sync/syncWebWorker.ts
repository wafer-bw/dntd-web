import { TaskFactory, BaseTask } from "./tasks"
import { instanceOfSyncerError, SyncerError } from "."
import { SyncerState, SyncerPayload, TestMode, SyncerPayloadType } from "../../types"
import { postTokenRequestMessage, postSyncStateMessage, postErrorMessage } from "./messages"

const syncRate = 250 // ms
let paused: boolean = false
let testMode: TestMode = TestMode.OFF
const taskFactory = new TaskFactory()
let token: string | undefined = undefined
let state: SyncerState = SyncerState.SYNCED
const parallelDownloadQueue: Map<string, BaseTask<SyncerPayload>> = new Map()
const seriesUploadQueue: { id: string, task: BaseTask<SyncerPayload> }[] = []

sync()
onmessage = (msg) => prequeue(msg)

function prequeue(msg: MessageEvent) {
    const { id, payload }: { id: string, payload: SyncerPayload } = msg.data

    switch (payload.type) {
        case SyncerPayloadType.TEST_MODE_UPDATE:
            testMode = payload.testMode
            if (testMode !== TestMode.OFF) token = "mock"
            return
        case SyncerPayloadType.AUTH_UPDATE:
            token = payload.token
            return
        case SyncerPayloadType.UNPAUSE:
            paused = false
            return
    }

    let task = taskFactory.createTask(payload, testMode)
    if (task === undefined) return

    if (task.async) {
        parallelDownloadQueue.set(id, task)
    } else {
        seriesUploadQueue.push({ id, task })
    }
}

async function sync() {
    while (true) {
        await sleep(syncRate)

        try {
            workParallelQueueTasks()
            await workSeriesQueueTasks()
        } catch (error) {
            handleSyncError(error)
        }
    }
}

// #!#
// TODO: MAKE SURE SYNC STATE MESSAGES ARE SENT IN ALL CORRECT PLACES
// #!#

function updateSyncState(state_?: SyncerState) {
    if (state_ !== undefined) state = state_
    if (!paused && state !== SyncerState.SYNCED && seriesUploadQueue.length + parallelDownloadQueue.size === 0) {
        state = SyncerState.SYNCED
    }
    postSyncStateMessage(seriesUploadQueue.length, state)
}

function handleSyncError(error: Error | SyncerError) {
    if (instanceOfSyncerError(error) && error.needsReAuth) {
        postTokenRequestMessage()
        token = undefined
    } else {
        paused = true
        state = SyncerState.PAUSED
        updateSyncState()
        postErrorMessage((instanceOfSyncerError(error))
            ? error
            : new SyncerError(error.message, "Unknown Error", false))
    }
}

async function workSeriesQueueTasks() {
    while (seriesUploadQueue.length !== 0 && token && !paused) {
        let { id, task } = seriesUploadQueue[0]
        let payload = await task.work(token)
        postMessage({ id, payload })
        seriesUploadQueue.shift()
    }
}

function workParallelQueueTasks() {
    if (parallelDownloadQueue.size === 0 || !token || paused) {
        return
    }
    
    for (let [id, task] of parallelDownloadQueue.entries()) {
        console.log(`About to work task ${id}`)
        parallelDownloadQueue.delete(id)
        task.work(token).then((payload: SyncerPayload) => {
            postMessage({ id, payload })
        }).catch((error: Error) => {
            parallelDownloadQueue.set(id, task)
            throw error
        })
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
