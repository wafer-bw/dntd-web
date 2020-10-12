import { instanceOfSyncerError } from "."
import { TaskFactory, BaseTask } from "./tasks"
import { postTokenRequestMessage, postSyncStateMessage } from "./messages"
import { SyncerError, SyncerState, SyncerPayload, TestMode, SyncerPayloadType } from "../../types"

let pendingDownloads = 0
const syncRate = 250 // ms
let testMode: TestMode = TestMode.OFF
const taskFactory = new TaskFactory()
let token: string | undefined = undefined
let state: SyncerState = SyncerState.SYNCED
const downloadQueue: Map<string, BaseTask<SyncerPayload>> = new Map()
const uploadQueue: { id: string, task: BaseTask<SyncerPayload> }[] = []

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
            updateSyncState(SyncerState.UPLOADING)
            return
    }

    let task = taskFactory.createTask(payload, testMode)
    if (task === undefined) return

    if (task.async) {
        downloadQueue.set(id, task)
    } else {
        uploadQueue.push({ id, task })
    }
}

async function sync() {
    while (true) {
        await sleep(syncRate)
        if (isSynced()) updateSyncState(SyncerState.SYNCED)
        workDownloadQueueTasks()
        await workUploadQueueTasks()
    }
}

function isSynced() {
    if (
        state !== SyncerState.PAUSED &&
        state !== SyncerState.SYNCED &&
        uploadQueue.length + downloadQueue.size + pendingDownloads === 0
    ) {
        return true
    }
    return false
}

function updateSyncState(newState?: SyncerState) {
    if (newState !== undefined && state !== newState) {
        state = newState
        postSyncStateMessage(uploadQueue.length, state)
    }
}

function handleSyncError(error: Error | SyncerError, id: string) {
    if (instanceOfSyncerError(error) && error.needsReAuth) {
        postTokenRequestMessage()
        token = undefined
        return
    } else {
        let syncerError: SyncerError = (instanceOfSyncerError(error)
            ? error
            : new SyncerError(error.message, "Unknown Error", false))
        if (syncerError.payload.pause) updateSyncState(SyncerState.PAUSED)
        postMessage({ id, error: syncerError.payload })
    }
}

async function workUploadQueueTasks() {
    while (uploadQueue.length !== 0 && token && state !== SyncerState.PAUSED) {
        updateSyncState(SyncerState.UPLOADING)
        let { id, task } = uploadQueue[0]
        try {
            let payload = await task.work(token)
            postMessage({ id, payload })
            uploadQueue.shift()
        } catch (error) {
            handleSyncError(error, id)
        }
    }
}

function workDownloadQueueTasks() {
    if (downloadQueue.size === 0 || !token || state === SyncerState.PAUSED) return
    updateSyncState(SyncerState.DOWNLOADING)
    for (let [id, task] of downloadQueue.entries()) {
        pendingDownloads += 1
        downloadQueue.delete(id)
        task.work(token)
            .then((payload: SyncerPayload) => postMessage({ id, payload }))
            .catch((error: SyncerError) => handleSyncError(error, id))
            .finally(() => pendingDownloads -= 1)
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
