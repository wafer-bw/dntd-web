import m from "mithril"
import { 
    googleComponent, shelvesComponent, syncStateComponent, addShelvesComponent
} from "../components"

export function libraryView() {

    function view() {
        return m("#library", [
            m(googleComponent),
            m(syncStateComponent),
            m(addShelvesComponent),
            m(shelvesComponent),
        ])
    }

    return {
        view: view
    }

}
