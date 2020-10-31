import m from "mithril"
import { urlController, journalController } from "../controllers"
import {
    googleComponent, breadcrumbComponent, entriesComponent, syncStateComponent,
    searchbarComponent, refinesComponent, composeComponent, testModeComponent,
    errorsComponent,
    settingsComponent
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
            m(errorsComponent),
            m(breadcrumbComponent),
            m(searchbarComponent),
            m(settingsComponent),
            m(refinesComponent),
            m("#entriesWrap", [
                m(composeComponent),
                m(entriesComponent),
            ])
        ])
    }

    return {
        view: view,
        oninit: oninit,
    }

}
