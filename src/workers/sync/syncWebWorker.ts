import { SyncerState, SyncerTaskPayload, TestMode, SyncerPayloadType } from "../../types"
import {
    postQueueState, syncRate, sleep, postError,
    postReAuthRequest, instanceOfSyncerError, SyncerError
} from "."
import { TaskFactory, BaseTask } from "./tasks"

let paused: boolean = false
let testMode: TestMode = TestMode.OFF
const taskFactory = new TaskFactory()
let token: string | undefined = undefined
const queue: {id: string, task: BaseTask<SyncerTaskPayload>}[] = []

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
    if (task === undefined) { return }

    // TODO figure out how to execute async tasks immediately and asynchronously here

    queue.push({id, task})
}

async function sync() {
    while (true) {
        await sleep(syncRate)
        if (!paused && queue.length === 0) {
            postQueueState(queue.length, SyncerState.SYNCED)
        }
        while (queue.length !== 0 && token && !paused) {
            let { id, task } = queue[0]
            try {
                let payload = await task.work(token)
                postMessage({ id, payload })
                queue.shift()
            } catch (e) {
                if (instanceOfSyncerError(e) && e.needsReAuth) {
                    postReAuthRequest()
                    token = undefined
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
        }
    }
}
