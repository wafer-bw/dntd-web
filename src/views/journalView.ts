import m from "mithril"
import { libraryModel } from ".."
import { googleComponent, breadcrumbComponent } from "./components"

export function journalView() {

    function view() {
        let shelf = libraryModel.shelves.get(m.route.param("shelfId"))
        let journal = shelf?.journals.get(parseInt(m.route.param("journalId")))

        return m("#shelf", [
            m(breadcrumbComponent),
            m(googleComponent),
            m("span", `Shelf: ${shelf?.title}, Journal: ${journal?.title}`)
        ])
    }

    return {
        view: view
    }

}
