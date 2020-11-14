import m from "mithril"
import { libraryController } from "../controllers"
import { libraryModel } from ".."

export function addShelvesComponent() {

    let newShelfUrls = ""
    let addingShelves = false

    function view() {
        return m("#addShelves", [
            addShelvesMessage(),
            addShelvesButton(),
            addShelvesTextbox(),
        ])
    }

    function addShelvesMessage() {
        if (libraryModel.shelves.size !== 0) return
        return m("span", "Add Google Spreadsheet URLs here to get started. ")
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
