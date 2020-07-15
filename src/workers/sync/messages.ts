import { SyncerError } from "."
import { SyncerPayload, SyncerPayloadType, SyncerState } from "../../types"

export function postSyncStateMessage(length: number, state: SyncerState) {
    postResponse({
        length: length,
        state: state,
        type: SyncerPayloadType.SYNC_STATE
    })
}

export function postErrorMessage(error: SyncerError) {
    postResponse({
        friendlyMsg: error.friendlyMsg,
        error: error,
        type: SyncerPayloadType.ERROR
    })
}

export function postTokenRequestMessage() {
    postMessage({ type: SyncerPayloadType.TOKEN_REQUEST })
}

function postResponse(payload: SyncerPayload) {
    console.log("posting payload:")
    console.log(payload)
    postMessage({payload})
}
