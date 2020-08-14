import m from "mithril"
import { signinView, libraryView, shelfView, journalView, testModeView } from "./views"
import {
    ServiceWorkerModel, SyncerModel, LibraryModel, GoogleModel, UrlModel, SearchModel, AppStateModel
} from "./models"

export const appStateModel = new AppStateModel()
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
        "/demo": testModeView,
        "/signin": signinView,
        "/library": libraryView,
        "/library/:shelfId": shelfView,
        "/setTestMode/:testMode": testModeView,
        "/library/:shelfId/:journalId": journalView,
    })
}
