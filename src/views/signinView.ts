import m from "mithril"
import { googleModel } from ".."
import { urlController } from "../controllers"
import { googleComponent } from "../components"

export function signinView() {

    function view() {
        return m("#auth", [
            m(googleComponent),
        ])
    }

    function onupdate() {
        if (googleModel.isSignedIn) {
            urlController.redirect("/library")
        }
    }

    return {
        view: view,
        onupdate: onupdate,
    }

}
