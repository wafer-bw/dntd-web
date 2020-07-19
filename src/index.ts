import m from "mithril"
import { signinView, libraryView, shelfView, journalView } from "./views"
import { ServiceWorkerModel, SyncerModel, LibraryModel, GoogleModel } from "./models"

export const serviceWorkerModel = new ServiceWorkerModel()
export const googleModel = new GoogleModel()
export const syncerModel = new SyncerModel()
export const libraryModel = new LibraryModel()

const root = document.getElementById("root")

if (root !== null) {
    m.route(root, "/", {
        "/": signinView,                                   // TODO decide what this should be
        "/signin": signinView,
        "/library": libraryView,
        "/library/:shelfId": shelfView,
        "/library/:shelfId/:journalId": journalView,
        // "/demo" : app,                                   // TODO
        // "/about": about,                                 // TODO
    })
}
