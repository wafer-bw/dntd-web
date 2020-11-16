import m from "mithril"
import { urlController, journalController } from "../controllers"
import {
    googleComponent, breadcrumbComponent, testModeComponent,
    errorsComponent, graphComponent, searchbarComponent, refinesComponent
} from "../components"

export function graphView() {

    function oninit() {
        const journal = urlController.getActiveJournal()
        if (journal === undefined || journal.loaded) return
        journalController.loadEntries(journal)
    }

    function view() {
        return m("#shelf", [
            m(googleComponent),
            m(testModeComponent),
            m(errorsComponent),
            m(breadcrumbComponent),
            m(searchbarComponent),
            m(refinesComponent),
            m(graphComponent),
        ])
    }

    return {
        view: view,
        oninit: oninit
    }

}
