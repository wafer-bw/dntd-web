import { ShelfModel } from "."
import { libraryController } from ".."
import { getStoredSpreadsheetUrls } from "../helpers"

export class LibraryFactory {
    public createLibrary() {
        return new LibraryModel(getStoredSpreadsheetUrls())
    }
}

class LibraryModel {

    public shelves: Map<string, ShelfModel | undefined>

    constructor(spreadsheetUrls?: string) {
        this.shelves = new Map()
        this.addNewShelves(libraryController.getSpreadsheetIdsFromUrls(spreadsheetUrls))
    }

    public async addNewShelves(idsToAdd: string[]) {
        idsToAdd.filter(id => !this.shelves.has(id))
            .forEach(id => this.shelves.set(id, undefined))
    }

    public async removeOldShelves(idsToKeep?: string[]) {
        if (idsToKeep === undefined) idsToKeep = []
        Array.from(this.shelves.keys()).filter(shelfId => !idsToKeep!.includes(shelfId))
            .forEach(shelfId => this.shelves.delete(shelfId))
    }

}
