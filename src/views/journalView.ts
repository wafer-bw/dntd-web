import m from "mithril"
import { urlController, journalController } from "../controllers"
import {
    googleComponent, breadcrumbComponent, entriesComponent, syncStateComponent,
    searchbarComponent, refinesComponent, composeComponent, testModeComponent,
    errorsComponent, graphComponent, graphBarComponent
} from "../components"
import { JournalModel } from "../models"
import { ViewMode } from "../types"

export function journalView() {
    let journal: JournalModel | undefined = undefined

    function oninit() {
        journal = urlController.getActiveJournal()
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
            m(graphBarComponent),
            m(refinesComponent),
            mainView(journal),
        ])
    }

    function mainView(journal: JournalModel | undefined) {
        if (journal === undefined || journal.loaded === false) return
        if (journal.viewMode === ViewMode.GRAPH) {
            return [
                m(graphComponent),
            ]
        }
        return [
            m("#entriesWrap", [
                m(entriesComponent),
                m(composeComponent),
            ])
        ]
    }

    return {
        view: view,
        oninit: oninit,
    }

}
