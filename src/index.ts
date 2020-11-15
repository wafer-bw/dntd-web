import m from "mithril"
import { signinView, libraryView, shelfView, journalView, testModeView, graphView } from "./views"
import {
    ServiceWorkerModel, SyncerModel, LibraryModel, GoogleModel, UrlModel, SearchModel,
    AppStateModel, ErrorsModel
} from "./models"

export const errorsModel = ErrorsModel.getInstance()
export const appStateModel = AppStateModel.getInstance()
export const serviceWorkerModel = ServiceWorkerModel.getInstance()
export const googleModel = GoogleModel.getInstance()
export const syncerModel = SyncerModel.getInstance()
export const libraryModel = LibraryModel.getInstance()
export const urlModel = UrlModel.getInstance()
export const searchModel = SearchModel.getInstance()

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
        "/library/:shelfId/:journalId/graph": graphView,
        "/demo/:shelfId/:journalId": journalView,
    })
}
