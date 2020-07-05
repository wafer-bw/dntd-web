import m from "mithril"
import { googleComponent, journalsComponent } from "./components"

export function shelfView() {

    function view() {
        return m("#shelf", [
            m(googleComponent),
            m(journalsComponent),
        ])
    }

    return {
        view: view
    }

}