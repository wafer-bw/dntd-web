import m from "mithril"
import { libraryModel } from "../.."
import { libraryController } from "../../controllers"

export function shelvesComponent() {

    let addingShelves = false
    let spreadsheetUrlsBuffer: string | undefined = undefined

    function view() {
        return m("#shelves", [
            addShelfButton(),
            spreadsheetsTextbox(),
            Array.from(libraryModel.shelves.entries()).map(([id, shelf]) => {
                if (shelf === undefined) {
                    return m("li", m("a", { href: `#/library/${id}` }, id))
                } else {
                    return m("li", m("a", { href: `#/library/${id}` }, shelf.title))
                }
            })
        ])
    }

    function addShelfButton() {
        return m("button", {
            id: "addShelf",
            onclick: async () => {
                if (addingShelves) {
                    libraryController.load(spreadsheetUrlsBuffer)
                }
                addingShelves = !addingShelves
            }
        }, (addingShelves) ? " ✓ " : "+/-")
    }

    function spreadsheetsTextbox() {
        if (!addingShelves) return null
        return m("textarea", {
            id: "spreadsheetURLs",
            placeholder: "Enter list of Google Sheets Spreadsheet URLs here",
            value: libraryModel.spreadsheetUrls,
            oninput: (event: any) => spreadsheetUrlsBuffer = event.target.value
        })
    }

    return {
        view: view,
    }

}