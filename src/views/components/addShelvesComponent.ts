import m from "mithril"
import { libraryController } from "../../controllers"

export function addShelvesComponent() {

    let addingShelves = false
    let newShelfUrls: string = ""

    function view() {
        return m("#addShelves", [
            addShelvesButton(),
            spreadsheetsTextbox(),
        ])
    }

    function addShelvesButton() {
        return m("button", {
            id: "addShelvesButton",
            onclick: async () => {
                if (addingShelves) libraryController.addShelvesByUrls(newShelfUrls)
                newShelfUrls = ""
                addingShelves = !addingShelves
            }
        }, (addingShelves) ? " ✓ " : "+/-")
    }

    function spreadsheetsTextbox() {
        if (!addingShelves) return null
        return m("textarea", {
            id: "addShelvesText",
            placeholder: "Enter list of Google Sheets Spreadsheet URLs here",
            oninput: (event: any) => newShelfUrls = event.target.value
        })
    }

    return {
        view: view,
    }

}