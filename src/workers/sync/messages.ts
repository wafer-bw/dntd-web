import { SyncerPayload, SyncerPayloadType, SyncerState } from "../../types"

export function postSyncStateMessage(length: number, state: SyncerState) {
    postResponse({
        length: length,
        state: state,
        type: SyncerPayloadType.SYNC_STATE,
        rejects: false,
    })
}

export function postTokenRequestMessage() {
    postResponse({
        type: SyncerPayloadType.TOKEN_REQUEST,
        rejects: false
    })
}

function postResponse(payload: SyncerPayload) {
    postMessage({payload})
}
