export * from "./typeGuards"
export * from "./syncWebWorker"

// TODO: REMOVE AND SWITCH ALL PLACES THIS IS USED TO USE src/types/errors/SyncerError
// SyncerError type is fragmented into two.
// Syncer likely only needs to throw regular errors now as they should be handled on
// the main thread side based on the payload type
// ... errors also need to be overhauled in src/errors
export class SyncerError extends Error {
    constructor(errorMsg: string, public friendlyMsg: string, public needsReAuth: boolean) {
        super(errorMsg)
    }
}
