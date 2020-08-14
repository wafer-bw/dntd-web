import m from "mithril"
import { signinView, libraryView, shelfView, journalView } from "./views"
import {
    ServiceWorkerModel, SyncerModel, LibraryModel, GoogleModel, UrlModel, SearchModel
} from "./models"

export const serviceWorkerModel = new ServiceWorkerModel()
export const googleModel = new GoogleModel()
export const syncerModel = new SyncerModel()
export const libraryModel = new LibraryModel()
export const urlModel = new UrlModel()
export const searchModel = new SearchModel()

const root = document.getElementById("root")

if (root !== null) {
    m.route(root, "/", {
        "/": signinView,        // TODO switch to be about page
        "/demo" : journalView,  // TODO get working
        "/signin": signinView,
        "/library": libraryView,
        "/library/:shelfId": shelfView,
        "/library/:shelfId/:journalId": journalView,
    })
}
