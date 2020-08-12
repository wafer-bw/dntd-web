import m from "mithril"
import { urlController } from "../controllers"

export function journalsComponent() {

    function view() {
        return m("#journals", journalList())
    }

    function journalList() {
        let shelf = urlController.getActiveShelf()
        if (shelf === undefined) {
            urlController.redirect("/library")
            return
        }
        return Array.from(shelf.journals.values()).map(journal => {
            let link = `#/library/${journal.shelf.id}/${journal.id}`
            return m("li", m("a", { href: link }, journal.title))
        })
    }

    return {
        view: view,
    }

}
