import m from "mithril"
import { libraryModel } from "../.."
import { ShelfModel } from "../../models"
import { libraryController } from "../../controllers"

export function shelvesComponent() {

    function view() {
        let shelves = Array.from(libraryModel.shelves.entries())
        return m("#shelvesList", shelves.map(([id, shelf]) => shelfNode(id, shelf)))
    }

    function delShelfButton(id: string) {
        return m("button", {
            class: "del",
            onclick: () => libraryController.removeShelves([id])
        }, "del")
    }

    function shelfNode(id: string, shelf: ShelfModel | undefined) {
        if (shelf === undefined) {
            return m("li", [
                delShelfButton(id),
                m("span", id)
            ])
        } else if (shelf.title === undefined) {
            return m("li", [
                delShelfButton(id),
                m("span", `${id} ${shelf.error}`)
            ])
        } else {
            return m("li", [
                delShelfButton(id),
                m("a", { href: `#/library/${id}` }, shelf.title)
            ])
        }
    }

    return {
        view: view,
    }

}