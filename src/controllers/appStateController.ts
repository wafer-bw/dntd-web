import { appStateModel } from ".."
import { syncerController } from "./syncerController"
import { TestMode, instanceOfTestMode } from "../types"

export const appStateController = {
    updateTestMode: updateTestMode,
}

function updateTestMode(mode: TestMode | string | undefined) {
    if (mode !== undefined && instanceOfTestMode(mode) && mode !== appStateModel.testMode) {
        appStateModel.testMode = mode
        syncerController.updateTestMode(mode)
    }
}
