import { SyncerTaskPayload } from "../../../types"

export abstract class BaseTask<P extends SyncerTaskPayload> {
    public payload: P

    constructor(payload: P) {
        this.payload = payload
    }

    public abstract work(token?: string): Promise<P>
}
