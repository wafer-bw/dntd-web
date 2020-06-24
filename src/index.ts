import m from "mithril"
import { app, about } from "./components"
import { Journal, Search, Syncer, ServiceWorker, Refines } from "./classes"

export const serviceWorker = new ServiceWorker()
export const syncer = new Syncer()
export const search = new Search()
export const refines = new Refines()
export const journal = new Journal()

let root = document.getElementById("root")

if (root !== null) {
    m.route(root, "/", {
        "/": app,
        "/demo" : app,
        "/about": about,
    })
}
