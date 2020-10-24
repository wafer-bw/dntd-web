import m from "mithril"
import { appStateModel } from ".."
import { TestMode } from "../types"
import { appStateController, urlController } from "../controllers"

export function testModeComponent() {

    function view() {
        if (appStateModel.testMode !== TestMode.OFF) {
            return m("#testMode", [
                m("span", `${appStateModel.testMode} active `),
                stopDemoButton()
            ])
        }
        return
    }

    function stopDemoButton() {
        if (appStateModel.testMode === TestMode.DEMO) {
            return m("button", { onclick: () => {
                appStateController.updateTestMode(TestMode.OFF)
                urlController.redirect("/library")
            }, class: "stopDemo" }, "Start Now")
        }
        return
    }

    return { view: view }
}
