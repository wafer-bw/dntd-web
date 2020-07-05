import m from "mithril"
import { googleComponent } from "./components"

export function journalView() {

    function view() {
        let shelfId = m.route.param("shelfId")
        let journalId = m.route.param("journalId")

        return m("#shelf", [
            m(googleComponent),
            m("span", `Shelf: ${shelfId}, Journal: ${journalId}`)
        ])
    }

    return {
        view: view
    }

}