import m from "mithril"
import { googleComponent, shelvesComponent, syncStateComponent } from "./components"

export function libraryView() {

    function view() {
        return m("#library", [
            m(googleComponent),
            m(syncStateComponent),
            m(shelvesComponent),
        ])
    }

    return {
        view: view
    }

}