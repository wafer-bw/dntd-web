import m from "mithril"
import { Caret } from "../types"
import { JournalModel, JournalEntryModel } from "../models"
import {
    caretController, urlController, entryController, journalController, searchController
} from "../controllers"

export function entriesComponent() {
    const caret: Caret = { pos: null, el: null }

    function view() {
        let shelf = urlController.getActiveShelf()
        const journal = urlController.getActiveJournal()
        if (!shelf || !journal) return null

        return m("#entries", [
            m(".tempguidancePre", "Entries"),
            entriesList(journal),
        ])
    }

    function entriesList(journal: JournalModel) {
        return searchController.filteredEntries(journal.entries)
            .map(({ idx, entry }) => entryVnode(entry, idx))
    }

    function createEntryVnode(journal: JournalModel, idx: number): m.Vnode {
        return m("button", {
            class: "createEntry",
            id: `createEntry-${idx}`,
            onclick: async () => journalController.createEntry(journal, idx)
        }, "ins")
    }

    function entryVnode(entry: JournalEntryModel, entryIdx: number): m.Vnode {
        return m(".entryWrap", { id: `entry-${entry.id}` }, [
            createEntryVnode(entry.journal, entryIdx),
            entryContent(entry, entryIdx),
            deleteEntryButton(entry, entryIdx),
            createEntryVnode(entry.journal, entryIdx+1),
        ])
    }

    function deleteEntryButton(entry: JournalEntryModel, entryIdx: number) {
        return m("button", {
            class: "del",
            onclick: async () => journalController.deleteEntry(entry.journal, entryIdx)
        }, "del")
    }

    function entryContent(entry: JournalEntryModel, entryIdx: number) {
        return m("div", entryContentSettings(entry, entryIdx), m.trust(entry.rendered))
    }

    function onEntryKeydown(event: any) {
        event.redraw = false
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault()
            event.target.blur()
        }
    }

    function onEntryInput(event: any, entry: JournalEntryModel) {
        let pos = caretController.getCaretPosition(event.target)
        caret.pos = (pos) ? pos[1] : null
        caret.el = event.target
        entryController.update(entry, event.target.innerText)
    }

    function onEntryUpdate(event: any) {
        event.redraw = false
        caretController.setCaretPosition(caret.el, caret.pos)
        caret.pos = null
        caret.el = null
    }

    async function onEntryBlur(event: any, entry: JournalEntryModel, entryIdx: number) {
        event.redraw = false
        journalController.updateEntry(entry.journal, entry, entryIdx, event.target.innerText)
    }

    function entryContentSettings(entry: JournalEntryModel, entryIdx: number) {
        return {
            id: `entry-${entry.id}-content`,
            contenteditable: "true",
            class: "entry breakwrap column",
            onkeydown: (event: any) => onEntryKeydown(event),
            oninput: (event: any) => onEntryInput(event, entry),
            onupdate: (event: any) => onEntryUpdate(event),
            onblur: (event: any) => onEntryBlur(event, entry, entryIdx),
        }
    }

    return { view: view }
}
