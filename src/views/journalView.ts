import m from "mithril"
import { urlController, journalController } from "../controllers"
import {
    googleComponent, breadcrumbComponent, entriesComponent, syncStateComponent,
    searchbarComponent, refinesComponent, composeComponent, testModeComponent,
} from "../components"

export function journalView() {

    function oninit() {
        const journal = urlController.getActiveJournal()
        if (journal === undefined || journal.loaded) return
        journalController.loadEntries(journal)
    }

    function view() {
        return m("#shelf", [
            m(googleComponent),
            m(testModeComponent),
            m(syncStateComponent),
            m(breadcrumbComponent),
            m(searchbarComponent),
            m(refinesComponent),
            m("#entriesWrap", [
                m(entriesComponent),
                m(composeComponent),
            ])
        ])
    }

    return {
        view: view,
        oninit: oninit,
    }

}
