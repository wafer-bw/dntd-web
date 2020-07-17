import { ShelfModel } from "."
import { libraryController } from "../controllers"

export class LibraryFactory {
    public createLibrary() {
        return new LibraryModel()
    }
}

class LibraryModel {
    public shelves: Map<string, ShelfModel | undefined>

    constructor() {
        this.shelves = new Map()
        this.addNewShelves(libraryController.getSpreadsheetIdsFromUrls(this.spreadsheetUrls))
    }

    set spreadsheetUrls(urls: string | undefined) {
        if (urls !== undefined) localStorage.setItem("spreadsheetUrls", urls)
    }
    get spreadsheetUrls(): string | undefined {
        return localStorage.getItem("spreadsheetUrls") || undefined
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
