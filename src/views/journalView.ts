import m from "mithril"
import { urlController, journalController } from "../controllers"
import { googleComponent, breadcrumbComponent, entriesComponent, syncStateComponent } from "../components"

export function journalView() {

    function oninit() {
        let journal = urlController.getActiveJournal()
        if (!journal) return
        journalController.loadEntries(journal)
    }

    function view() {
        let shelf = urlController.getActiveShelf()
        let journal = urlController.getActiveJournal()

        return m("#shelf", [
            m(googleComponent),
            m(syncStateComponent),
            m(breadcrumbComponent),
            m("span", `Shelf: ${shelf?.title}, Journal: ${journal?.title}`),
            m(entriesComponent)
        ])
    }

    return {
        view: view,
        oninit: oninit,
    }

}
