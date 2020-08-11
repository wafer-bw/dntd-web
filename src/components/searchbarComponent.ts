import m from "mithril"
import { searchModel } from ".."
import { Caret } from "../types"
import { caretController, textController, searchController } from "../controllers"


export function searchbarComponent() {
    const caret: Caret = { pos: null, el: null }

    function view() {
        return m("#search", [
            m("#searchQuery", searchNodeSettings(), m.trust(searchModel.barQuery.rendered)),
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
        let pos = caretController.getCaretPosition(event.target)
        caret.pos = (pos) ? pos[1] : null
        caret.el = event.target
        searchController.updateSearchbar(textController.escape(event.target.innerText))
    }

    function onSearchUpdate() {
        caretController.setCaretPosition(caret.el, caret.pos)
        caret.pos = null
        caret.el = null
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
            onclick: () => searchController.updateSearchbar("")
        }
    }

    return { view: view }
}
