import m from "mithril"
import { googleComponent, journalsComponent, syncStateComponent, breadcrumbComponent } from "../components"

export function shelfView() {

    function view() {
        return m("#shelf", [
            m(breadcrumbComponent),
            m(googleComponent),
            m(syncStateComponent),
            m(journalsComponent),
        ])
    }

    return {
        view: view
    }

}