import m from "mithril"
import { urlController, journalController } from "../controllers"
import {
    googleComponent, breadcrumbComponent, syncStateComponent, testModeComponent, 
    errorsComponent, graphComponent
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
            m(syncStateComponent),
            m(errorsComponent),
            m(breadcrumbComponent),
            m(graphComponent),
        ])
    }

    return {
        view: view,
        oninit: oninit
    }

}
