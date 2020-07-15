import m from "mithril"
import { libraryModel } from ".."
import { googleComponent } from "./components"

export function journalView() {

    function view() {
        let shelf = libraryModel.shelves.get(m.route.param("shelfId"))
        if (shelf === undefined) return null
        let journal = shelf.journals.get(parseInt(m.route.param("journalId")))
        if (journal === undefined) return null

        return m("#shelf", [
            m(googleComponent),
            m("span", `Shelf: ${shelf.title}, Journal: ${journal.title}`)
        ])
    }

    return {
        view: view
    }

}
