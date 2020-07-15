import m from "mithril"
import { googleComponent, journalsComponent, syncStateComponent } from "./components"

export function shelfView() {

    function view() {
        return m("#shelf", [
            m(googleComponent),
            m(syncStateComponent),
            m(journalsComponent),
        ])
    }

    return {
        view: view
    }

}