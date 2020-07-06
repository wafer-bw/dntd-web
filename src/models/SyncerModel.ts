import { MockGoogleUser } from "../mocks"
import { SyncerTask, SyncerState } from "../types"

class SyncerModel {
    public worker: Worker
    private requestsCounter = 0
    private requests: Map<string, Function> = new Map()
    public state: SyncerState = SyncerState.DOWNLOADING
    public user: gapi.auth2.GoogleUser | MockGoogleUser | null = null

    constructor() {
        this.worker = new Worker("./js/syncWebWorker.js")
        this.worker.onmessage = (msg: MessageEvent) => this.onMessage(msg)
    }

    public pushSyncerTask<T extends SyncerTask>(task: T): Promise<T> {
        let id = `task-${this.requestsCounter++}`
        return new Promise((resolve, reject) => {
            this.requests.set(id, ({ task, error }: { task: T, error: Error }) => {
                (error) ? reject(error) : resolve(task)
            })
            this.worker.postMessage({ id, task })
        })
    }

    private onMessage<T extends SyncerTask>(msg: MessageEvent) {
        let { id, task, error }: { id: string | null, task: T, error: Error } = msg.data
        if (id !== null && this.requests.has(id)) {
            this.requests.get(id)!({ task, error })
            this.requests.delete(id)
        } else {
            // Handle tasks sent from the sync worker that were not
            // invoked from this here and therefore have no id.
        }
    }

}

export const syncerModel = new SyncerModel()
