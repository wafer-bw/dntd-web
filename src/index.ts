import m from "mithril"
import { ServiceWorkerModel, SyncerModel } from "./models"
import { signinView, libraryView, shelfView, journalView } from "./views"

const root = document.getElementById("root")

export const syncerModel = new SyncerModel()
export const serviceWorkerModel = new ServiceWorkerModel()

if (root !== null) {
    m.route(root, "/", {
        "/": libraryView,                                   // TODO decide what this should be
        "/signin": signinView,
        "/library": libraryView,
        "/library/:shelfId": shelfView,
        "/library/:shelfId/:journalId": journalView,
        // "/demo" : app,                                   // TODO
        // "/about": about,                                 // TODO
    })
}
