import m from "mithril"
import { ErrorPayload } from "../types"
import { ShelfFactory } from "../models"
import { libraryModel, syncerController } from ".."
import { FriendlyError } from "../helpers"

const shelfFactory = new ShelfFactory()
const spreadsheetIdPattern = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/g

export const libraryController = {
    addShelvesByUrls: addShelvesByUrls,
    addShelves: addShelves,
    removeShelves: removeShelves,
    loadShelves: loadShelves,
    getSpreadsheetIdsFromUrls: getSpreadsheetIdsFromUrls,
}

function addShelvesByUrls(urls: string) {
    let ids = getSpreadsheetIdsFromUrls(urls)
    addShelves(ids)
}

function addShelves(ids: string[]) {
    ids.filter(id => !libraryModel.shelves.has(id))
        .forEach(id => libraryModel.shelves.set(id, undefined))
    libraryModel.shelfIds = Array.from(libraryModel.shelves.keys())
    loadShelves(false)
}

function removeShelves(ids?: string[]) {
    if (ids === undefined) ids = Array.from(libraryModel.shelves.keys())
    ids.filter(id => libraryModel.shelves.has(id))
        .forEach(id => libraryModel.shelves.delete(id))
    libraryModel.shelfIds = Array.from(libraryModel.shelves.keys())
}

async function loadShelves(reloadLoaded?: boolean, ids?: string[]) {
    if (ids === undefined) ids = Array.from(libraryModel.shelves.keys())
    let shelvesToLoad = (reloadLoaded) ? ids : ids.filter(id => !libraryModel.shelves.get(id))
    shelvesToLoad.forEach(id => syncerController.getSpreadsheet(id)
        .then(payload => {
            let shelf = shelfFactory.createShelf(id, payload.spreadsheet)
            libraryModel.shelves.set(shelf.id, shelf)
        })
        .catch((error: ErrorPayload) => {
            // TODO: Handle retry prep from here instead of leaving it in the queue and pausing the queue
            new FriendlyError(error.error.message, error.friendlyMsg)
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
