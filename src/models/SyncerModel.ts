import { MockGoogleUser } from "../mocks"
import { SyncerState, SyncerTaskPayload } from "../types"

export class SyncerModel {
    public worker: Worker
    private requestsCounter = 0
    private requests: Map<string, Function> = new Map()
    public state: SyncerState = SyncerState.DOWNLOADING
    public user: gapi.auth2.GoogleUser | MockGoogleUser | null = null

    constructor() {
        this.worker = new Worker("./js/syncWebWorker.js")
        this.worker.onmessage = (msg: MessageEvent) => this.onMessage(msg)
    }

    public pushSyncerTask<P extends SyncerTaskPayload>(payload: P): Promise<P> {
        let id = `payload-${this.requestsCounter++}`
        return new Promise((resolve, reject) => {
            this.requests.set(id, ({ payload, error }: { payload: P, error: Error }) => {
                (error) ? reject(error) : resolve(payload)
            })
            this.worker.postMessage({ id, payload })
        })
    }

    private onMessage<P extends SyncerTaskPayload>(msg: MessageEvent) {
        let { id, payload, error }: { id: string | null, payload: P, error: Error } = msg.data
        // console.log(id)
        // console.log(payload)
        // console.log(error)
        if (id !== null && this.requests.has(id)) {
            this.requests.get(id)!({ payload, error })
            this.requests.delete(id)
        } else {
            // Handle tasks sent from the sync worker that were not
            // invoked from this here and therefore have no id.
        }
    }

}
