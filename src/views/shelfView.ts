import m from "mithril"
import { googleComponent, journalsComponent, syncStateComponent, breadcrumbComponent } from "../components"

export function shelfView() {

    function view() {
        return m("#shelf", [
            m(googleComponent),
            m(syncStateComponent),
            m(breadcrumbComponent),
            m(journalsComponent),
        ])
    }

    return {
        view: view
    }

}