import m from "mithril"
import { TestMode } from "../types"
import { googleModel, urlModel } from ".."

export function testModeComponent() {

    function view() {
        let mode = urlModel.testMode
        if (!googleModel.isSignedIn || mode === TestMode.OFF || mode === TestMode.DEMO) return
        return m("#testMode", m("span", urlModel.testMode))
    }

    return { view: view }
}
