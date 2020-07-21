import m from "mithril"
import { urlController } from "../controllers"

export function breadcrumbComponent() {

    function view() {
        return m("#breadcrumb", urlController.getBreadcrumbTrail())
    }

    return {
        view: view,
    }

}