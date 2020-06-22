import m from "mithril"
import { syncer } from ".."
import { SyncerState } from "../types"

export function spinner() {

    function view() {
        return m("#status", m("span", [syncStateIcon(), unpauseVnode()]))
    }

    function syncStateIcon() {
        return m("i", {
            id: "syncState",
            class: "material-icons material-icons-outlined md-dark"
        }, syncer.state)
    }

    function unpauseVnode() {
        if (syncer.state === SyncerState.PAUSED) {
            return m("button", {
                id: "unpauseSync",
                onclick: () => syncer.unpause(),
            }, "Unpause Syncing")
        }
        return
    }

    return { view: view }
}
