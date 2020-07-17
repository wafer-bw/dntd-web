import m from "mithril"
import { ErrorPayload } from "../types"
import { ShelfFactory } from "../models"
import { libraryModel, syncerController } from ".."
import { FriendlyError } from "../helpers"

const shelfFactory = new ShelfFactory()
const spreadsheetIdPattern = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/g

export const libraryController = {
    init: init,
    load: load,
    unload: unload,
    getSpreadsheetIdsFromUrls: getSpreadsheetIdsFromUrls,
}

export function init() {
    libraryModel.addNewShelves(getSpreadsheetIdsFromUrls(libraryModel.spreadsheetUrls))
    m.redraw()
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
