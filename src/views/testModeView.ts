
import { urlModel } from ".."
import { urlController, appStateController } from "../controllers"
import { TestMode } from "../types"

export function testModeView() {
    // TODO: WORK OUT HOW TO MANAGE TEST MODE
    function view() {
        if (urlModel.hash.startsWith("#/demo")) {
            appStateController.updateTestMode(TestMode.DEMO)
            urlController.redirect("/library")
        }

        if (urlModel.hash.startsWith("#/setTestMode")) {
            appStateController.updateTestMode(urlModel.getParam("testMode"))
            urlController.redirect("/")
        }
    }

    return {
        view: view
    }

}
