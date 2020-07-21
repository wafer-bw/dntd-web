import m from "mithril"
import { libraryController } from "../controllers"

export function addShelvesComponent() {

    let newShelfUrls = ""
    let addingShelves = false

    function view() {
        return m("#addShelves", [
            addShelvesButton(),
            addShelvesTextbox(),
        ])
    }

    function addShelvesButton() {
        return m("button", {
            id: "addShelvesButton",
            onclick: async () => {
                if (addingShelves) libraryController.addShelves(newShelfUrls)
                newShelfUrls = ""
                addingShelves = !addingShelves
            }
        }, (addingShelves) ? " ✓ " : "+/-")
    }

    function addShelvesTextbox() {
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