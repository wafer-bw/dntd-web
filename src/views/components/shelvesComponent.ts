import m from "mithril"
import { libraryModel } from "../../models"

export function shelvesComponent() {

    function view() {
        return m("#shelves", libraryModel.shelves
            .map(shelfId => m("li", m("a", { href: `#/library/${shelfId}` }, shelfId)))
        )
    }

    return {
        view: view,
    }

}