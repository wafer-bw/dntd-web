import m from "mithril"
import { syncer, journal } from ".."
import { SyncerState } from "../types"

export function syncStateIndicator() {

    function view() {
        console.log("REDRAW")
        return m("#status", m("span", syncState()))
    }

    function syncState() {
        if (journal.spreadsheets.size === 0) { return }
        return m("span", [
            syncStateIcon(),
            syncStateText(),
            unpauseSync()
        ])
    }

    function syncStateText() {
        let txt = ""
        let class_ = `syncState ${stateColorClass()}`

        switch (syncer.state) {
            case SyncerState.DOWNLOADING:
                txt = "Downloading journal data from drive..."
                break
            case SyncerState.PAUSED:
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
        let class_ = `material-icons material-icons-outlined syncState ${stateColorClass()}`
        return m("i", { id: "syncStateIcon", class: class_ }, syncer.state)
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

    function stateColorClass() {
        switch (syncer.state) {
            case SyncerState.PAUSED:
                return "error"
            case SyncerState.SYNCED:
                return "okay"
            default:
                return "warn"
        }
    }

    return { view: view }
}
