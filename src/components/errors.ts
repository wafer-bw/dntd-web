import m from "mithril"
import { journal } from ".."

export function errors() {

    function view() {
        if (journal.errors.length === 0) { return [] }
        return m("#errors", journal.errors.map((error, idx) => [
            m(".error", [
                m("span", error),
                m("button", errorDismissButtonSettings(idx), "dismiss"),
            ])
        ]))
    }

    function errorDismissButtonSettings(idx: number) {
        return {
            class: "dismissErrorButton",
            onclick: () => journal.errors.splice(idx, 1),
        }
    }

    return { view: view }
}
