import m from "mithril"
import { signinView, libraryView, shelfView } from "./views"
import { app } from "./components"
import { Journal, Search, Syncer, ServiceWorker, Refines } from "./classes"

export const syncer = new Syncer()
export const search = new Search()
export const refines = new Refines()
export const journal = new Journal()
export const serviceWorker = new ServiceWorker()

let root = document.getElementById("root")

if (root !== null) {
    m.route(root, "/", {
        "/": app,
        "/signin": signinView,
        "/library": libraryView,
        "/library/:shelfId": shelfView,
        // "/demo" : app,
        // "/about": about,
    })
}
