import m from "mithril"
import { googleModel } from ".."
import { googleComponent } from "./components"

export function signinView() {

    function view() {
        return m("#auth", [
            m(googleComponent),
        ])
    }

    function onupdate() {
        if (googleModel.isSignedIn) {
            window.location.hash = "/library" // TODO: redirect to correct place
        }
    }

    return {
        view: view,
        onupdate: onupdate,
    }

}