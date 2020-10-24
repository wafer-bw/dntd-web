import { ErrorPayload, SyncerPayloadType } from "../types"

export class SyncerError extends Error {
    public payload: ErrorPayload

    constructor(errorMsg: string, public friendlyMsg: string, public needsReAuth: boolean, pause?: boolean) {
        super(errorMsg)
        this.payload = {
            pause: (pause !== undefined) ? pause : true,
            error: this,
            friendlyMsg: this.friendlyMsg,
            type: SyncerPayloadType.ERROR,
        }
    }
}
