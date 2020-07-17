export * from "./typeGuards"
export * from "./syncWebWorker"

// TODO: REMOVE AND SWITCH ALL PLACES THIS IS USED TO USE src/types/errors/SyncerError
export class SyncerError extends Error {
    constructor(errorMsg: string, public friendlyMsg: string, public needsReAuth: boolean) {
        super(errorMsg)
    }
}
