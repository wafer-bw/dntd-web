import m from "mithril"
import { urlController, journalController } from "../controllers"
import { googleComponent, breadcrumbComponent, entriesComponent, syncStateComponent } from "../components"

export function journalView() {

    function oninit() {
        journalController.loadEntries(urlController.getActiveJournal())
    }

    function view() {
        return m("#shelf", [
            m(googleComponent),
            m(syncStateComponent),
            m(breadcrumbComponent),
            m(entriesComponent)
        ])
    }

    return {
        view: view,
        oninit: oninit,
    }

}
