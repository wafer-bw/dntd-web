import m from "mithril"
import { getTestMode } from "./helpers"
import { Journal, Search, Syncer, ServiceWorker } from "./classes"
import { googleAPI, compose, entries, searchbar, toggles, spinner, refines, errors } from "./components"

export const serviceWorker = new ServiceWorker()
export const testMode = getTestMode()
export const syncer = new Syncer(testMode)
export const search = new Search()
export const journal = new Journal()

let mountPoint = document.getElementById("dntd")
if (mountPoint !== null) { m.mount(document.getElementById("dntd")!, app) }

function app() {

    function view() {
        return [
            m(spinner),
            m(googleAPI),
            m("#errorsWrap", m(errors)),
            (journal.isActive)
                ? [
                    m("#searchWrap", [
                        m(searchbar),
                        m(toggles)
                    ]),
                    m(refines),
                    m("#entriesWrap", entriesWrappSettings(), [
                        m(entries),
                        m(compose),
                    ]),
                ]
                : [],
        ]
    }

    function entriesWrappSettings() {
        return { class: (journal.hideTagRefines) ? "fullWidth" : "" }
    }

    return { view: view }
}
