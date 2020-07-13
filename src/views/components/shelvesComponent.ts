import m from "mithril"
import { libraryModel } from "../.."
import { getStoredSpreadsheetUrls, setStoredSpreadsheetUrls } from "../../helpers"

export function shelvesComponent() {

    let addingShelves = false
    let spreadsheetUrls = getStoredSpreadsheetUrls()
    let spreadsheetUrlsBuffer = spreadsheetUrls

    function view() {
        if (libraryModel === undefined) {
            return m("#shelves", "Library Loading")
        } else {
            return m("#shelves", [
                (addingShelves) ? spreadsheetsTextbox() : null,
                addShelfButton(),
                libraryModel.shelves.map(shelfId => {
                    return m("li", m("a", { href: `#/library/${shelfId}` }, shelfId))
                })
            ])
        }
    }

    function addShelfButton() {
        return m("button", {
            id: "addShelf",
            onclick: async () => {
                spreadsheetUrls = spreadsheetUrlsBuffer
                if (addingShelves) {
                    setStoredSpreadsheetUrls(spreadsheetUrls)
                    libraryModel.updateShelves(spreadsheetUrls)
                }
                addingShelves = !addingShelves
            }
        }, (addingShelves) ? " ✓ " : "+/-")
    }

    function spreadsheetsTextbox() {
        return m("textarea", {
            id: "spreadsheetURLs",
            placeholder: "Enter list of Google Sheets Spreadsheet URLs here",
            value: spreadsheetUrls,
            oninput: (event: any) => spreadsheetUrlsBuffer = event.target.value
        })
    }

    return {
        view: view,
    }

}