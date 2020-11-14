export * from "./syncTasks"
export * from "./typeGuards"
export * from "./syncWebWorker"
export * from "./syncResponses"

export const syncRate = 250 // ms

export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class SyncerError extends Error {
    constructor(errorMsg: string, public friendlyMsg: string, public needsReAuth: boolean) {
        super(errorMsg)
    }
}
