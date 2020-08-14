import m from "mithril"
import {
    googleComponent, journalsComponent, syncStateComponent, breadcrumbComponent,
    testModeComponent,
} from "../components"

export function shelfView() {

    function view() {
        return m("#shelf", [
            m(googleComponent),
            m(testModeComponent),
            m(syncStateComponent),
            m(breadcrumbComponent),
            m(journalsComponent),
        ])
    }

    return {
        view: view
    }

}
