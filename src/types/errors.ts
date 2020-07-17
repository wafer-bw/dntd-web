import { ErrorPayload, SyncerPayloadType } from "."

export interface GapiErrorResponseBody {
    code: number,
    message: string,
    status: string
}

export interface GapiErrorResponse {
    error: GapiErrorResponseBody
}

export class SyncerError extends Error {
    public payload: ErrorPayload

    constructor(errorMsg: string, public friendlyMsg: string, public needsReAuth: boolean) {
        super(errorMsg)
        this.payload = {
            error: this,
            friendlyMsg: this.friendlyMsg,
            type: SyncerPayloadType.ERROR,
        }
    }
}
