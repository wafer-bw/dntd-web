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
        if (isSynced()) updateSyncState(SyncerState.SYNCED)
        try {
            workParallelQueueTasks()
            await workSeriesQueueTasks()
        } catch (error) {
            handleSyncError(error)
        }
    }
}

function isSynced() {
    if (
        !paused &&
        state !== SyncerState.SYNCED &&
        seriesUploadQueue.length + parallelDownloadQueue.size === 0
    ) {
        return true
    }
    return false
}

function updateSyncState(newState?: SyncerState) {
    if (newState !== undefined && state !== newState) {
        state = newState
        postSyncStateMessage(seriesUploadQueue.length, state)
    }
}

function handleSyncError(error: Error | SyncerError) {
    if (instanceOfSyncerError(error) && error.needsReAuth) {
        postTokenRequestMessage()
        token = undefined
    } else {
        paused = true
        updateSyncState(SyncerState.PAUSED)
        postErrorMessage((instanceOfSyncerError(error))
            ? error
            : new SyncerError(error.message, "Unknown Error", false))
    }
}

async function workSeriesQueueTasks() {
    while (seriesUploadQueue.length !== 0 && token && !paused) {
        updateSyncState(SyncerState.UPLOADING)
        let { id, task } = seriesUploadQueue[0]
        let payload = await task.work(token)
        postMessage({ id, payload })
        seriesUploadQueue.shift()
    }
}

function workParallelQueueTasks() {
    if (parallelDownloadQueue.size === 0 || !token || paused) return
    updateSyncState(SyncerState.DOWNLOADING)
    for (let [id, task] of parallelDownloadQueue.entries()) {
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
