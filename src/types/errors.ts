import { ErrorPayload, SyncerPayloadType } from "."

export interface GapiErrorResponseBody {
    code: number,
    message: string,
    status: string
}

export interface GapiErrorResponse {
    error: GapiErrorResponseBody
}

export class SyncerError extends Error { // TODO: see if this can be moved to src/errors/
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
