import m from "mithril"
import { Caret } from "../types"
import { EntryModel } from "../classes"
import { JournalModel } from "../models"
import { journalModel, /*searchModel*/ } from ".."
import { caretController, urlController } from "../controllers"

export function entries() {
    var caret: Caret = { pos: null, el: null }

    function view() {
        let journal = urlController.getActiveJournal()
        if (journal === undefined) return null // TODO: return something else or redirect

        return m("#entries", [
            m(".tempguidancePre", "Entries"),
            entriesList(journal),
        ])
    }

    function entriesList(journal: JournalModel) {
        // TODO: Re-add
        // let searchEntries = search.entries()
        // if (searchEntries !== null) return searchEntries.map(({idx, entry}) => entryVnode(idx, entry))
        return journal.entries.map(({id, entry}) => entryVnode(journal, id, entry))
    }

    function entryVnode(journal: JournalModel, id: number, entry: EntryModel): m.Vnode {
        return m(".entryWrap", { id: `entry-${id}` }, [
            entryContent(entry, id),
            deleteEntryButton(journal, id),
        ])
    }

    function deleteEntryButton(journal: JournalModel, id: number) {
        return m("button", {
            class: "del",
            onclick: async () => journal.deleteEntry(id)
        }, "del")
    }

    function entryContent(entry: EntryModel, id: number) {
        return m("div", entryContentSettings(entry, id), m.trust(entry.rendered))
    }

    function onEntryKeydown(event: any) {
        event.redraw = false
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault()
            event.target.blur()
        }
    }

    function onEntryInput(event: any, entry: EntryModel) {
        let pos = caretController.getCaretPosition(event.target)
        caret = { pos: (pos) ? pos[1] : null, el: event.target }
        entry.raw = event.target.innerText
    }

    function onEntryUpdate(event: any) {
        event.redraw = false
        caretController.setCaretPosition(caret.el, caret.pos)
        caret = { pos: null, el: null }
    }

    function onEntryFocus(event: any, entry: EntryModel) {
        event.redraw = false
        entry.focused = true
    }

    async function onEntryBlur(event: any, journal: JournalModel, entry: EntryModel, idx: number) {
        event.redraw = false
        entry.focused = false
        await journal.saveEntry(idx)
    }

    function onEntryMouseover(event: any, entry: Entry) {
        if (!journal.hideEntriesKeys) {
            event.redraw = false
        }
        entry.hovered = true
    }

    function onEntryMouseout(event: any, entry: Entry) {
        if (!journal.hideEntriesKeys) {
            event.redraw = false
        }
        entry.hovered = false
    }

    function entryContentSettings(entry: Entry, idx: number) {
        return {
            id: `entry-${idx}-content`,
            contenteditable: "true",
            class: "entry breakwrap column",
            onkeydown: (event: any) => onEntryKeydown(event),
            oninput: (event: any) => onEntryInput(event, entry),
            onupdate: (event: any) => onEntryUpdate(event),
            onblur: (event: any) => onEntryBlur(event, entry, idx),
            onmouseover: (event: any) => onEntryMouseover(event, entry),
            onmouseout: (event: any) => onEntryMouseout(event, entry),
            onfocus: (event: any) => onEntryFocus(event, entry),
        }
    }

    return { view: view }
}
