import m from "mithril"
import { journal } from ".."
import { Caret } from "../types"
import { Entry } from "../classes"
import { getCaretPosition, setCaretPosition } from "../helpers"

export function compose() {
    var caret: Caret = { el: null, pos: null }

    const composePrefix = new Entry("")
    const composeContent = new Entry("")
    const composeSuffix = new Entry("")

    const prefixSettings = { "placeholder": "Static Entry Prefix" }
    const entrySettings = { "placeholder": "Entry Content" }
    const suffixSettings = { "placeholder": "Static Entry Suffix" }

    function view() {
        return m("#compose", [
            m("#prefix", composeNodeSettings(composePrefix, prefixSettings), m.trust(composePrefix.rendered)),
            m("#content", composeNodeSettings(composeContent, entrySettings), m.trust(composeContent.rendered)),
            m("#suffix", composeNodeSettings(composeSuffix, suffixSettings), m.trust(composeSuffix.rendered)),
        ])
    }

    function getComposedEntry() {
        let els = [
            document.getElementById("prefix"),
            document.getElementById("content"),
            document.getElementById("suffix"),
        ]
        return els.map(el => el!.innerText).join("")
    }

    function composeNodeSettings(entry: Entry, extraSettings: object) {
        let baseSettings = {
            contenteditable: "true",
            class: "entry breakwrap column",
            onkeydown: async (event: any) => await composeKeydown(event),
            oninput: (event: any) => composeInput(event, entry),
            onupdate: () => composeUpdate(),
        }
        return Object.assign(baseSettings, extraSettings)
    }

    async function composeKeydown(event: any) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault()
            let raw = getComposedEntry()
            composeContent.raw = ""
            let newEntry = new Entry(raw, "")
            let idx = journal.spreadsheet!.sheet!.entries.length
            journal.spreadsheet!.sheet!.entries.push(newEntry)
            m.redraw()
            await journal.saveEntry(idx)
            m.redraw()
        }
    }

    function composeInput(event: any, entry: Entry) {
        let pos = getCaretPosition(event.target)
        caret = (pos)
            ? { pos: pos[1], el: event.target }
            : { pos: null, el: null }
        entry.raw = event.target.innerText
    }

    function composeUpdate() {
        setCaretPosition(caret.el, caret.pos)
        caret = { el: null, pos: null }
    }

    return { view: view }
}
