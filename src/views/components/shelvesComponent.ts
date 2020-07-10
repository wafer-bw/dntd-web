import m from "mithril"
import { libraryModel } from "../../models"

export function shelvesComponent() {

    function view() {
        if (libraryModel === undefined) {
            return m("#shelves", "Library Loading")
        } else {
            return m("#shelves", libraryModel.shelves.map(shelf => {
                m("li", m("a", { href: `#/library/${shelf.id}` }, shelf.id))
            }))
        }
    }

    return {
        view: view,
    }

}