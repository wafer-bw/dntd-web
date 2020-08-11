import m from "mithril"
import { urlController, journalController } from "../controllers"
import {
    googleComponent, breadcrumbComponent, entriesComponent, syncStateComponent,
    searchbarComponent, refinesComponent
} from "../components"

export function journalView() {

    function oninit() {
        let journal = urlController.getActiveJournal()
        if (journal === undefined || journal.loaded) return
        journalController.loadEntries(journal)
    }

    function view() {
        return m("#shelf", [
            m(googleComponent),
            m(syncStateComponent),
            m(breadcrumbComponent),
            m(searchbarComponent),
            m(refinesComponent),
            m(entriesComponent),
        ])
    }

    return {
        view: view,
        oninit: oninit,
    }

}
