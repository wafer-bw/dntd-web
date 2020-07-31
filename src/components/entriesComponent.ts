import m from "mithril"
import { Caret } from "../types"
import { JournalModel, JournalEntryModel } from "../models"
import { caretController, urlController, entryController, journalController } from "../controllers"

export function entriesComponent() {
    const caret: Caret = { pos: null, el: null }

    function view() {
        let shelf = urlController.getActiveShelf()
        let journal = urlController.getActiveJournal()
        if (!shelf || !journal) return null

        return m("#entries", [
            m(".tempguidancePre", "Entries"),
            entriesList(journal),
        ])
    }

    function entriesList(journal: JournalModel) {
        return journal.entries.map(({ entry }, entryIdx) => entryVnode(entry, entryIdx))
    }

    function entryVnode(entry: JournalEntryModel, entryIdx: number): m.Vnode {
        return m(".entryWrap", { id: `entry-${entry.id}` }, [
            entryContent(entry, entryIdx),
            deleteEntryButton(entry, entryIdx),
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
        entryController.save(entry, entryIdx, event.target.innerText, true)
            
    }

    function entryContentSettings(entry: JournalEntryModel, entryIdx: number) {
        return {
            id: `entry-${entryIdx}-content`,
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
