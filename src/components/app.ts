import m from "mithril"
import { journal } from ".."
import { getHash } from "../helpers"
import {
    googleAPI, compose, entries, searchbar, toggles, syncStateIndicator, refinesPane, errors, links
} from "."

export function app() {

    function view() {
        let hash = getHash()
        return [
            (hash === "#!" || hash === "") ? null : m(links),
            m(syncStateIndicator),
            m(googleAPI),
            m("#errorsWrap", m(errors)),
            (journal.isActive)
                ? [
                    m("#searchWrap", [
                        m(searchbar),
                        m(toggles)
                    ]),
                    m(refinesPane),
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