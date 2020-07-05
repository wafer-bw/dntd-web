import m from "mithril"
import { googleComponent, shelvesComponent } from "./components"

export function libraryView() {

    function view() {
        return m("#library", [
            m(googleComponent),
            m(shelvesComponent),
        ])
    }

    return {
        view: view
    }

}