import m from "mithril"
import { 
    googleComponent, shelvesComponent, syncStateComponent, addShelvesComponent,
    testModeComponent, errorsComponent
} from "../components"

export function libraryView() {

    function view() {
        return m("#library", [
            m(googleComponent),
            m(testModeComponent),
            m(syncStateComponent),
            m(errorsComponent),
            m(addShelvesComponent),
            m(shelvesComponent),
        ])
    }

    return {
        view: view
    }

}
