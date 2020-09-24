import m from "mithril"
import { Caret } from "../types"
import { entryFactory } from "../factories"
import { BaseEntryModel, JournalModel } from "../models"
import { urlController, journalController, caretController, entryController } from "../controllers"

export function composeComponent() {
    var caret: Caret = { el: null, pos: null }

    const composePrefixEntry = entryFactory.createBaseEntry()
    const composeContentEntry = entryFactory.createBaseEntry()
    const composeSuffixEntry = entryFactory.createBaseEntry()

    const prefixSettings = { "placeholder": "Static Entry Prefix" }
    const entrySettings = { "placeholder": "Entry Content" }
    const suffixSettings = { "placeholder": "Static Entry Suffix" }

    function view() {
        const journal = urlController.getActiveJournal()
        if (journal === undefined || journal.loaded === false) return
        return m("#compose", [
            m(
                "#prefix",
                composeNodeSettings(composePrefixEntry, journal, prefixSettings),
                m.trust(composePrefixEntry.rendered)
            ),
            m(
                "#content",
                composeNodeSettings(composeContentEntry, journal, entrySettings),
                m.trust(composeContentEntry.rendered)
            ),
            m(
                "#suffix",
                composeNodeSettings(composeSuffixEntry, journal, suffixSettings),
                m.trust(composeSuffixEntry.rendered)
            ),
        ])
    }

    function getComposedContent() {
        let els = [
            document.getElementById("prefix"),
            document.getElementById("content"),
            document.getElementById("suffix"),
        ]
        return els.map(el => el!.innerText).join("")
    }

    function composeNodeSettings(entry: BaseEntryModel, journal: JournalModel, extraSettings: object) {
        let baseSettings = {
            contenteditable: "true",
            class: "entry breakwrap column",
            onkeydown: async (event: any) => await composeKeydown(event, journal),
            oninput: (event: any) => composeInput(event, entry),
            onupdate: () => composeUpdate(),
        }
        return Object.assign(baseSettings, extraSettings)
    }

    async function composeKeydown(event: any, journal: JournalModel) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault()
            let content = getComposedContent()
            entryController.update(composeContentEntry, "")
            let idx = journal.entries.length
            journalController.createEntry(journal, idx, content)
        }
    }

    function composeInput(event: any, entry: BaseEntryModel) {
        let pos = caretController.getCaretPosition(event.target)
        caret.pos = (pos) ? pos[1] : null
        caret.el = event.target
        entryController.update(entry, event.target.innerText)
    }

    function composeUpdate() {
        caretController.setCaretPosition(caret.el, caret.pos)
        caret.pos = null
        caret.el = null
    }

    return { view: view }
}
