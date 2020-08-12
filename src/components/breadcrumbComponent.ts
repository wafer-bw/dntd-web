import m from "mithril"
import { googleModel } from ".."
import { urlController } from "../controllers"

export function breadcrumbComponent() {

    function view() {
        if (!googleModel.isSignedIn) return
        return m("#breadcrumb", urlController.getBreadcrumbTrail())
    }

    return {
        view: view,
    }

}