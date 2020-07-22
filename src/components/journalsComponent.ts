import m from "mithril"
import { libraryModel } from ".."
import { urlController } from "../controllers"

export function journalsComponent() {

    function view() {
        return m("#journals", journalList())
    }

    function journalList() {
        let shelf = libraryModel.shelves.get(m.route.param("shelfId"))
        if (shelf === undefined) {
            urlController.redirect("/library")
            return
        }
        return Array.from(shelf.journals.values()).map(journal => {
            let link = `#/library/${journal.shelfId}/${journal.id}`
            return m("li", m("a", { href: link }, journal.title))
        })
    }

    return {
        view: view,
    }

}