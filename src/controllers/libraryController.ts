import m from "mithril"
import { ShelfFactory } from "../models"
import { libraryModel, syncerController } from ".."

const shelfFactory = new ShelfFactory()
const spreadsheetIdPattern = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/g

export const libraryController = {
    load: load,
    unload: unload,
    getSpreadsheetIdsFromUrls: getSpreadsheetIdsFromUrls,
}

async function load(spreadsheetUrls?: string) {
    if (spreadsheetUrls !== undefined) libraryModel.spreadsheetUrls = spreadsheetUrls
    let ids = getSpreadsheetIdsFromUrls(libraryModel.spreadsheetUrls)
    libraryModel.addNewShelves(ids)
    libraryModel.removeOldShelves(ids)
    await loadShelves()
}

function unload() {
    libraryModel.removeOldShelves()
}

function getSpreadsheetIdsFromUrls(urls: string | undefined): string[] {
    let ids: string[] = []
    if (urls) {
        Array.from(urls.matchAll(spreadsheetIdPattern)).forEach(m => ids.push(m[1]))
    }
    return ids
}

async function loadShelves(reloadAll?: boolean) {
    let ids = Array.from(libraryModel.shelves.keys())
    let shelvesToLoad = (reloadAll) ? ids : ids.filter(id => !libraryModel.shelves.get(id))
    await Promise.all(shelvesToLoad.map(id => syncerController.getSpreadsheet(id)))
        .then(tasks => tasks.forEach(task => {
            console.log(task.spreadsheet)
            let shelf = shelfFactory.createShelf(task.spreadsheet)
            if (shelf !== undefined) libraryModel.shelves.set(shelf.id, shelf)
            m.redraw()
        }))
}
