import m from "mithril"
import { journal, syncer } from ".."

export function spinner() {

    function view() {
        return m("#spinner", [spinnerVnode(), unpauseVnode()])
    }

    function spinnerVnode() {
        if (journal.loading && !syncer.paused) {
            return m(".spinner", [m("div"), m("div"), m("div"), m("div")])
        }
        return
    }

    function unpauseVnode() {
        if (syncer.paused) {
            return m("button", {
                id: "unpauseSync",
                onclick: () => syncer.unpause(),
            }, "Unpause Syncing")
        }
        return
    }

    return { view: view }
}
