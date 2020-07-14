import m from "mithril"
import { libraryModel } from "../.."

export function journalsComponent() {

    function view() {
        return m("#journals", journalList())
    }

    function journalList() {
        let shelf = libraryModel.shelves.get(m.route.param("shelfId"))
        if (shelf === undefined) return null
        return shelf.journals.map(journal => {
            let link = `#/library/${journal.shelfId}/${journal.id}`
            return m("li", m("a", { href: link }, journal.title))
        })
    }

    return {
        view: view,
    }

}