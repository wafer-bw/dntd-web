import m from "mithril"
import { errorsModel } from ".."
import { FriendlyError } from "../errors"
import { errorsController } from "../controllers"

export function errorsComponent() {

    function view() {
        return m("#errorsContainer", errorsList())
    }

    function errorsList() {
        if (errorsModel.errors.length !== 0) {
            return m("#errors", errorsModel.errors.map((error, idx) => errorVnode(error, idx)))
        }
        return null
    }

    function errorVnode(error: FriendlyError, idx: number) {
        return m("div", [
            m("span", { id: `error-${idx}`}, error.friendlyMsg),
            m("button", { 
                onclick: () => errorsController.remove(idx),
                class: "dismissErrorButton",
            }, "Dismiss"),
        ])
    }

    return { view: view }
}
