// import { Caret } from "../../types"
// import m from "mithril"
// import { EntryModel } from "../../models"
// import { journal, search } from ".."
// import { getCaretPosition, setCaretPosition } from "../helpers"

// export function entries() {
//     var caret: Caret = { pos: null, el: null }

//     function view() {
//         return m("#entries", [
//             m(".tempguidancePre", "Entries"),
//             entriesVnodes(),
//         ])
//     }

//     function entriesVnodes() {
//         let searchEntries = search.entries()
//         if (searchEntries !== null) {
//             return searchEntries.map(({idx, entry}) => entryVnode(idx, entry))
//         }

//         let allEntries = Array.from(journal.spreadsheet!.sheet!.entries.entries())
//         return allEntries.map(([idx, entry]) => entryVnode(idx, entry))
//     }

//     function entryVnode(idx: number, entry: Entry): m.Vnode {
//         return m(".entryWrap", { id: `entry-${idx}` }, [
//             entryContent(entry, idx),
//             deleteEntryButton(idx),
//         ])
//     }

//     function deleteEntryButton(idx: number) {
//         return m("button", {
//             class: "del",
//             onclick: async () => await journal.deleteEntry(idx)
//         }, "del")
//     }

//     function entryContent(entry: Entry, idx: number) {
//         return m("div", entryContentSettings(entry, idx), m.trust(
//             (!entry.hovered && !entry.focused && journal.hideEntriesKeys)
//                 ? entry.readableRendered
//                 : entry.rendered
//         ))
//     }

//     function onEntryKeydown(event: any) {
//         event.redraw = false
//         if (event.keyCode == 13 && !event.shiftKey) {
//             event.preventDefault()
//             event.target.blur()
//         }
//     }

//     function onEntryInput(event: any, entry: Entry) {
//         let pos = getCaretPosition(event.target)
//         caret = { pos: (pos) ? pos[1] : null, el: event.target }
//         entry.raw = event.target.innerText
//     }

//     function onEntryUpdate(event: any) {
//         event.redraw = false
//         setCaretPosition(caret.el, caret.pos)
//         caret = { pos: null, el: null }
//     }

//     function onEntryFocus(event: any, entry: Entry) {
//         event.redraw = false
//         entry.focused = true
//     }

//     async function onEntryBlur(event: any, entry: Entry, idx: number) {
//         event.redraw = false
//         entry.focused = false
//         await journal.saveEntry(idx)
//     }

//     function onEntryMouseover(event: any, entry: Entry) {
//         if (!journal.hideEntriesKeys) {
//             event.redraw = false
//         }
//         entry.hovered = true
//     }

//     function onEntryMouseout(event: any, entry: Entry) {
//         if (!journal.hideEntriesKeys) {
//             event.redraw = false
//         }
//         entry.hovered = false
//     }

//     function entryContentSettings(entry: Entry, idx: number) {
//         return {
//             id: `entry-${idx}-content`,
//             contenteditable: "true",
//             class: "entry breakwrap column",
//             onkeydown: (event: any) => onEntryKeydown(event),
//             oninput: (event: any) => onEntryInput(event, entry),
//             onupdate: (event: any) => onEntryUpdate(event),
//             onblur: (event: any) => onEntryBlur(event, entry, idx),
//             onmouseover: (event: any) => onEntryMouseover(event, entry),
//             onmouseout: (event: any) => onEntryMouseout(event, entry),
//             onfocus: (event: any) => onEntryFocus(event, entry),
//         }
//     }

//     return { view: view }
// }
