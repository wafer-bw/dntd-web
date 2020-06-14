import { Caret } from "../types"
import m, { Vnode } from "mithril"
import { Entry } from "../classes"
import { journal, search } from ".."
import { getCaretPosition, setCaretPosition } from "../helpers"

export function entries() {
    var caret: Caret = { pos: null, el: null }

    function view() {
        return m("#entries", [
            m(".tempguidancePre", "Entries"),
            entriesVnodes(),
        ])
    }

    function entriesVnodes() {
        let searchEntries = search.entries()
        if (searchEntries !== null) {
            return searchEntries.map(({idx, entry}) => entryVnode(idx, entry))
        }

        let allEntries = Array.from(journal.spreadsheet!.sheet!.entries.entries())
        return allEntries.map(([idx, entry]) => entryVnode(idx, entry))
    }

    function entryVnode(idx: number, entry: Entry): Vnode {
        return m(".entryWrap", { id: `entry-${idx}` }, [
            entryContent(entry, idx),
            deleteEntryButton(idx),
        ])
    }

    function deleteEntryButton(idx: number) {
        return m("button", {
            class: "del",
            onclick: async () => {
                await journal.deleteEntry(idx)
                m.redraw()
            }
        }, "del")
    }

    function entryContent(entry: Entry, idx: number) {
        return m("div", entryContentSettings(entry, idx), m.trust(
            (!entry.hovered && !entry.focused && journal.hideEntriesKeys)
                ? entry.readableRendered
                : entry.rendered
        ))
    }

    function onEntryKeydown(event: any) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault()
            event.target.blur()
        }
    }

    function onEntryInput(event: any, entry: Entry) {
        let pos = getCaretPosition(event.target)
        caret = { pos: (pos) ? pos[1] : null, el: event.target }
        entry.raw = event.target.innerText
    }

    function onEntryUpdate() {
        setCaretPosition(caret.el, caret.pos)
        caret = { pos: null, el: null }
    }

    function onEntryFocus(entry: Entry) {
        entry.focused = true
    }

    async function onEntryBlur(entry: Entry, idx: number) {
        entry.focused = false
        await journal.saveEntry(idx)
        m.redraw()
    }

    function onEntryMouseover(entry: Entry) {
        entry.hovered = true
    }

    function onEntryMouseout(entry: Entry) {
        entry.hovered = false
    }

    function entryContentSettings(entry: Entry, idx: number) {
        return {
            id: `entry-${idx}-content`,
            contenteditable: "true",
            class: "entry breakwrap column",
            onkeydown: (event: any) => onEntryKeydown(event),
            oninput: (event: any) => onEntryInput(event, entry),
            onupdate: () => onEntryUpdate(),
            onblur: () => onEntryBlur(entry, idx),
            onmouseover: () => onEntryMouseover(entry),
            onmouseout: () => onEntryMouseout(entry),
            onfocus: () => onEntryFocus(entry),
        }
    }

    return { view: view }
}
