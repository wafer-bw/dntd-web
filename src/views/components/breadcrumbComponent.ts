import m from "mithril"
import { breadcrumbController } from "../../controllers/breadcrumbController"

export function breadcrumbComponent() {

    function view() {
        return m("#breadcrumb", breadcrumbController.getBreadcrumbTrail())
    }

    return {
        view: view,
    }

}