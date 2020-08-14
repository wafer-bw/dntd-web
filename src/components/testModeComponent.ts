import m from "mithril"
import { googleModel } from ".."
import { TestMode } from "../types"
import { urlController } from "../controllers"

export function testModeComponent() {

    function view() {
        let mode = urlController.getTestMode()
        if (!googleModel.isSignedIn || mode === TestMode.OFF || mode === TestMode.DEMO) return
        return m("#testMode", m("span", mode))
    }

    return { view: view }
}
