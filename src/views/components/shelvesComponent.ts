import m from "mithril"
import { libraryModel } from "../.."
// import { getStoredSpreadsheetUrls, setStoredSpreadsheetUrls } from "../../helpers"

export function shelvesComponent() {

    // let addingShelves = false
    // let spreadsheetUrls = getStoredSpreadsheetUrls()

    function view() {
        if (libraryModel === undefined) {
            return m("#shelves", "Library Loading")
        } else {
            return m("#shelves", libraryModel.shelves.map(shelf => {
                return m("li", m("a", { href: `#/library/${shelf.id}` }, shelf.id))
            }))
        }
    }

    // function addShelfButton() {
    //     return m("button", {
    //         id: "addShelf",
    //         onclick: async () => {
    //             spreadsheetUrls = getStoredSpreadsheetUrls()
    //             addingShelves = true
    //         }
    //     }, (addingShelves) ? " ✓ " : "+/-")
    // }

    // function spreadsheetsTextbox() {
    //     return m("textarea", {
    //         id: "spreadsheetURLs",
    //         placeholder: "Enter list of Google Sheets Spreadsheet URLs here",
    //         value: getStoredSpreadsheetUrls(),
    //         oninput: (event: any) => setStoredSpreadsheetUrls(event.target.value),
    //     })
    // }

    return {
        view: view,
    }

}