import { SyncerError } from "."
import { 
    SyncerResponse, SyncerResponseType, SyncerState
} from "../../types"

// TODO: convert these to use new pattern

export function postQueueState(length: number, state: SyncerState) {
    postResponse({
        length: length,
        state: state,
        type: SyncerResponseType.SYNCER_STATE
    })
}

export function postError(error: SyncerError) {
    postResponse({
        friendlyMsg: error.friendlyMsg,
        error: error,
        type: SyncerResponseType.ERROR
    })
}

export function postReAuthRequest() {
    postMessage({ type: SyncerResponseType.REAUTH })
}

function postResponse(response: SyncerResponse) {
    postMessage(response)
}
