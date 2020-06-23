import m from "mithril"
import { syncer } from ".."
import { SyncerState } from "../types"

export function spinner() {

    function view() {
        return m("#status", m("span", syncState()))
    }

    function syncState() {
        return m("span", [
            syncStateIcon(),
            syncStateText(),
            unpauseSync()
        ])
    }

    function syncStateText() {
        let txt = ""
        let class_ = "syncState"
        switch (syncer.state) {
            case SyncerState.DOWNLOADING:
                txt = "Downloading journal data from drive..."
                break
            case SyncerState.PAUSED:
                class_ += " warn"
                txt = "Warning! - Syncing is paused."
                break
            case SyncerState.SYNCED:
                txt = "All changes saved."
                break
            case SyncerState.UPLOADING:
                txt = "Uploading changes to drive..."
                break
        }
        return m("span", { id: "syncStateText", class: class_ }, txt)
    }

    function syncStateIcon() {
        let class_ = (syncer.state === SyncerState.PAUSED)
            ? "material-icons material-icons-outlined syncState warn"
            : "material-icons material-icons-outlined syncState md-dark"
        return m("i", {
            id: "syncStateIcon",
            class: class_
        }, syncer.state)
    }

    function unpauseSync() {
        if (syncer.state === SyncerState.PAUSED) {
            return m("button", {
                id: "unpauseSync",
                class: "syncState",
                onclick: () => syncer.unpause()
            }, "Unpause Syncing")
        }
        return
    }

    return { view: view }
}
