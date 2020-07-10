import m from "mithril"
import { SyncerController } from "./controllers"
import { signinView, libraryView, shelfView, journalView } from "./views"
import { ServiceWorkerModel, SyncerModel, LibraryFactory } from "./models"

const root = document.getElementById("root")

export const syncerModel = new SyncerModel()
export const syncerController = new SyncerController(syncerModel)
export const serviceWorkerModel = new ServiceWorkerModel()
export const libraryModel = new LibraryFactory().createLibrary()

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
