import m from "mithril"
import { urlController } from "../controllers"
import { googleComponent, breadcrumbComponent, entriesComponent } from "../components"

export function journalView() {

    function view() {
        let shelf = urlController.getActiveShelf()
        let journal = urlController.getActiveJournal()

        return m("#shelf", [
            m(breadcrumbComponent),
            m(googleComponent),
            m("span", `Shelf: ${shelf?.title}, Journal: ${journal?.title}`),
            m(entriesComponent)
        ])
    }

    return {
        view: view
    }

}
