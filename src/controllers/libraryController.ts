import m from "mithril"
import { libraryModel } from ".."
import { ErrorPayload } from "../types"
import { shelfFactory } from "../factories"
import { urlController, journalController, errorsController, syncerController } from "../controllers"

const spreadsheetIdPattern = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/g

export const libraryController = {
    addShelves: addShelves,
    loadShelves: loadShelves,
    removeShelves: removeShelves,
    getSpreadsheetIdsFromUrls: getSpreadsheetIdsFromUrls,
}

function addShelves(urls: string) {
    let ids = getSpreadsheetIdsFromUrls(urls)
    ids = ids.filter(id => !libraryModel.shelves.has(id))
    ids.forEach(id => libraryModel.shelves.set(id, undefined))
    libraryModel.shelfIds = Array.from(libraryModel.shelves.keys())
    loadShelves(false, ids)
}

function removeShelves(ids?: string[]) {
    if (ids === undefined) ids = Array.from(libraryModel.shelves.keys())
    ids = ids.filter(id => libraryModel.shelves.has(id))
    ids.forEach(id => libraryModel.shelves.delete(id))
    libraryModel.shelfIds = Array.from(libraryModel.shelves.keys())
}

function loadShelves(reloadLoaded?: boolean, ids?: string[]) {
    if (ids === undefined) ids = Array.from(libraryModel.shelves.keys())
    if (reloadLoaded) {
        ids.forEach(id => libraryModel.shelves.set(id, undefined))
        m.redraw()
    }
    ids.filter(id => !libraryModel.shelves.get(id))
        .forEach(id => syncerController.getSpreadsheet(id)
        .then(payload => {
            let shelf = shelfFactory.createShelf(id, payload.spreadsheet)
            libraryModel.shelves.set(shelf.id, shelf)
            let journal = urlController.getActiveJournal()
            if (journal && journal.shelf === shelf) {
                journalController.loadEntries(journal)
            }
        })
        .catch((error: ErrorPayload) => {
            errorsController.add(error.error.message, error.friendlyMsg)
            let shelf = shelfFactory.createShelf(id, undefined, error.friendlyMsg)
            libraryModel.shelves.set(id, shelf)
        })
        .finally(() => {
            m.redraw()
        })
    )
}

function getSpreadsheetIdsFromUrls(urls: string | undefined): string[] {
    let ids: string[] = []
    if (urls) {
        Array.from(urls.matchAll(spreadsheetIdPattern)).forEach(m => ids.push(m[1]))
    }
    return ids
}
