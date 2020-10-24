
import { urlModel } from ".."
import { TestMode } from "../types"
import { urlController, appStateController, libraryController } from "../controllers"

export function testModeView() {
    function view() {
        if (urlModel.hash.startsWith("#/demo")) {
            appStateController.updateTestMode(TestMode.DEMO)
            libraryController.addShelves("https://docs.google.com/spreadsheets/d/shelf/edit")
            urlController.redirect("/library/shelf/0")
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
