import { MockGoogleUser } from "../mocks"
import { FriendlyError } from "../helpers"
import { SyncerState, SyncerPayload, SyncerPayloadType } from "../types"
import { googleModel } from "./GoogleModel"
import { syncerController } from ".."

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

    public pushSyncerTask<P extends SyncerPayload>(payload: P): Promise<P> {
        let id = `payload-${this.requestsCounter++}`
        return new Promise((resolve, reject) => {
            this.requests.set(id, ({ payload, error }: { payload: P, error: Error }) => {
                (error) ? reject(error) : resolve(payload)
            })
            this.worker.postMessage({ id, payload })
        })
    }

    private onMessage(msg: MessageEvent) {
        let { id, payload, error }: { id: string | null, payload: SyncerPayload , error: Error } = msg.data
        if (id !== null && this.requests.has(id)) {
            this.requests.get(id)!({ payload, error })
            this.requests.delete(id)
        } else {
            switch (payload.type) {
                case SyncerPayloadType.SYNC_STATE:
                    this.state = payload.state
                    break
                case SyncerPayloadType.ERROR:
                    throw new FriendlyError(payload.error.message, payload.friendlyMsg)
                case SyncerPayloadType.TOKEN_REQUEST:
                    syncerController.updateAuth(googleModel.token)
                    break
            }
        }
    }

}
