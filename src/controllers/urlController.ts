import m from "mithril"
import { libraryModel, urlModel } from ".."
import { ShelfModel, JournalModel } from "../models"

export const urlController = {
    redirect: redirect,
    getActiveShelf: getActiveShelf,
    getActiveJournal: getActiveJournal,
    getBreadcrumbTrail: getBreadcrumbTrail,
}

function redirect(hash: string) {
    urlModel.hash = hash
}

function getActiveShelf(): ShelfModel | undefined {
    let id = urlModel.shelfId
    if (id === undefined) return undefined
    return libraryModel.shelves.get(id)
}

function getActiveJournal(): JournalModel | undefined {
    let id = urlModel.journalId
    let shelf = getActiveShelf()
    if (id === undefined || shelf === undefined) return undefined
    return shelf.journals.get(id)
}

function getBreadcrumbTrail() {
    let breadcrumb: m.Vnode[] = []
    let hash = urlModel.hash.split("?")[0].split("/").filter(crumb => crumb !== "#" && crumb !== "")
    let shelfId: string | undefined = undefined
    for (let i = 0; i < hash.length; i++) {
        let crumb = hash[i]
        let trail = "#/" + hash.slice(0, i + 1).join("/")
        if (i === 1) {
            shelfId = crumb
            crumb = libraryModel.shelves.get(crumb)?.title || crumb
        } else if (i === 2 && shelfId !== undefined) {
            crumb = libraryModel.shelves.get(shelfId)?.journals.get(parseInt(crumb))?.title || crumb
        }
        if (i !== 0) breadcrumb.push(m("span", " / "))
        if (i === hash.length - 1) {
            breadcrumb.push(m("span", `${crumb}`))
        } else {
            breadcrumb.push(m("a", {
                href: trail,
                id: `bc-${trail.replace("#", "").replace("/", "")}`,
            }, `${crumb}`))
        }
    }
    return breadcrumb
}
