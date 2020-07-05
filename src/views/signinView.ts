import m from "mithril"
import { googleModel } from "../models"
import { googleComponent, preambleComponent } from "."

export function signinView() {

    function view() {
        return m("#auth", [
            m(preambleComponent),
            m(googleComponent),
        ])
    }

    function onupdate() {
        if (googleModel.isSignedIn) {
            window.location.hash = "/" // TODO: redirect to correct place
        }
    }

    return {
        view: view,
        onupdate: onupdate,
    }

}