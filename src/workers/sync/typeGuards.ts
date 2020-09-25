import { SyncerError } from "../../types"

export function instanceOfSyncerError(error: Error | SyncerError): error is SyncerError {
    return "needsReAuth" in error
}
