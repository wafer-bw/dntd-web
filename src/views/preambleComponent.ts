import m from "mithril"
import { googleModel } from "../models"

export function preambleComponent() {

    function view() {
        return (!googleModel.isSignedIn)
            ? m(".preamble", "PREAMBLE MSG") // TODO: fill out
            : null
    }

    return {
        view: view,
    }

}
