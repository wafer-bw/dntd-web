import m from "mithril"
import { searchModel } from ".."
import { Caret, ViewMode } from "../types"
import { caretController, textController, searchController, urlController } from "../controllers"

export function graphBarComponent() {
    const caret: Caret = { pos: null, el: null }

    function view() {
        const journal = urlController.getActiveJournal()
        if (journal === undefined || journal.loaded === false) return
        if (journal.viewMode !== ViewMode.GRAPH) return
        return m("#filter", [
            m("#graphFilter", nodeSettings(), m.trust(searchModel.graphFilter.rendered)),
            m("button", clearNodeSettings(), "x"),
        ])
    }

    function nodeSettings() {
        return {
            placeholder: "Filter graph",
            contenteditable: "true",
            class: `entry breakwrap`,
            oninput: (event: any) => onInput(event),
            onupdate: () => onUpdate(),
            onkeydown: (event: any) => onKeydown(event)
        }
    }

    function clearNodeSettings() {
        return {
            id: "clearSearch",
            class: "del",
            onclick: () => searchController.updateGraphFilterBar("")
        }
    }

    function onInput(event: any) {
        let pos = caretController.getCaretPosition(event.target)
        caret.pos = (pos) ? pos[1] : null
        caret.el = event.target
        searchController.updateGraphFilterBar(textController.escape(event.target.innerText))
    }

    function onUpdate() {
        caretController.setCaretPosition(caret.el, caret.pos)
        caret.pos = null
        caret.el = null
    }

    function onKeydown(event: any) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault()
            event.target.blur()
        }
    }

    return { view: view }
}
