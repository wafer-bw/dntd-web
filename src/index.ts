import m from "mithril"
import { app } from "./components"
import { signinView, libraryView, shelfView, journalView } from "./views"
import { Journal, Search, ServiceWorker, Refines } from "./classes"

export const search = new Search()
export const refines = new Refines()
export const journal = new Journal()
export const serviceWorker = new ServiceWorker()

let root = document.getElementById("root")

if (root !== null) {
    m.route(root, "/", {
        "/": app,                                           // TODO remove
        "/signin": signinView,
        "/library": libraryView,
        "/library/:shelfId": shelfView,
        "/library/:shelfId/:journalId": journalView,
        // "/demo" : app,                                   // TODO
        // "/about": about,                                 // TODO
    })
}
