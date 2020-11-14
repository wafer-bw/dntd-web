import m from "mithril"
import { errorsController } from "../controllers"
import { SyncerState, SyncerPayload, ErrorPayload } from "../types"

export class SyncerModel {
    private static instance: SyncerModel

    public requestsCounter: number
    public requests: Map<string, Function>
    public state: SyncerState

    private constructor() {
        this.requestsCounter = 0
        this.requests = new Map()
        this.state = SyncerState.INITIALIZING
    }

    static getInstance(): SyncerModel {
        return (!SyncerModel.instance) ? new SyncerModel() : SyncerModel.instance
    }

    public pushSyncerTask<P extends SyncerPayload>(payload: P, worker: Worker): Promise<P> {
        let id = `payload-${this.requestsCounter++}`
        return new Promise((resolve, reject) => {
            this.requests.set(id, ({ payload, error }: { payload: P, error: ErrorPayload }) => {
                if (error && error.rejects) {
                    this.requests.delete(id)
                    reject(error)
                } else if (error) {
                    errorsController.add(error.error.message, error.friendlyMsg)
                    m.redraw()
                } else {
                    this.requests.delete(id)
                    resolve(payload)
                }
            })
            worker.postMessage({ id, payload })
        })
    }

}
