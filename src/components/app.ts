import m from "mithril"
import { journal } from ".."
import {
    googleAPI, compose, entries, searchbar, toggles, spinner, refinesPane, errors, links
} from "."
import { getHash } from "../helpers"

export function app() {

    function view() {
        return [
            (getHash() === "#!") ? null : m(links),
            m(spinner),
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