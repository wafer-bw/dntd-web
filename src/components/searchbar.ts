import m from "mithril"
import { search } from ".."
import { Caret } from "../types"
import { getCaretPosition, setCaretPosition, escapeHtml } from "../helpers"

export function searchBar() {
    var caret: Caret = { el: null, pos: null }

    function view() {
        return m("#search", [
            m("#searchQuery", searchNodeSettings(), m.trust(search.barQuery.rendered)),
            m("button", clearSearchNodeSettings(), "x")
        ])
    }

    function searchNodeSettings() {
        return {
            placeholder: "Search for text or tags",
            contenteditable: "true",
            class: `entry breakwrap`,
            oninput: (event: any) => onSearchInput(event),
            onupdate: () => onSearchUpdate(),
            onkeydown: (event: any) => onSearchKeydown(event)
        }
    }

    function onSearchInput(event: any) {
        let pos = getCaretPosition(event.target)
        caret = (pos) ? { pos: pos[1], el: event.target } : { pos: null, el: null }
        search.barQuery.raw = escapeHtml(event.target.innerText)
    }

    function onSearchUpdate() {
        setCaretPosition(caret.el, caret.pos)
        caret = { el: null, pos: null }
    }

    function onSearchKeydown(event: any) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault()
            event.target.blur()
        }
    }

    function clearSearchNodeSettings() {
        return {
            id: "clearSearch",
            class: "del",
            onclick: () => search.barQuery.raw = ""
        }
    }

    return { view: view }
}
