import m from "mithril"
import { syncerModel, googleModel, libraryModel } from ".."
import { SyncerState } from "../types"
import { syncerController } from "../controllers"

export function syncStateComponent() {

    function view() {
        if (!googleModel.isSignedIn || libraryModel.shelves.size === 0) return
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
        let class_ = `syncState ${stateColorClass()}`

        switch (syncerModel.state) {
            case SyncerState.DOWNLOADING:
                txt = "Downloading journal data from drive..."
                break
            case SyncerState.PAUSED:
                txt = "Warning! - Syncing is paused."
                break
            case SyncerState.SYNCED:
                txt = "Cloud synced."
                break
            case SyncerState.UPLOADING:
                txt = "Uploading changes to drive..."
                break
            case SyncerState.INITIALIZING:
                txt = "Initializing..."
        }
        return m("span", { id: "syncStateText", class: class_ }, txt)
    }

    function syncStateIcon() {
        let class_ = `material-icons material-icons-outlined syncState ${stateColorClass()}`
        return m("i", { id: "syncStateIcon", class: class_ }, syncerModel.state)
    }

    function unpauseSync() {
        if (syncerModel.state === SyncerState.PAUSED) {
            return m("button", {
                id: "unpauseSync",
                class: "syncState",
                onclick: () => syncerController.unpause()
            }, "Unpause Syncing")
        }
        return
    }

    function stateColorClass() {
        switch (syncerModel.state) {
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
