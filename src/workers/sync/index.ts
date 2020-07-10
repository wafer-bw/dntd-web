export * from "./typeGuards"
export * from "./syncWebWorker"
export * from "./syncResponses"

// TODO: see if this can be moved
export class SyncerError extends Error {
    constructor(errorMsg: string, public friendlyMsg: string, public needsReAuth: boolean) {
        super(errorMsg)
    }
}
