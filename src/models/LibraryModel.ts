import { syncerController } from ".."
import { ShelfFactory, ShelfModel } from "."
import { getStoredSpreadsheetUrls, spreadsheetIdPattern } from "../helpers"

export class LibraryFactory {
    public createLibrary() {
        return new LibraryModel(getStoredSpreadsheetUrls())
    }
}

class LibraryModel {

    private shelfFactory = new ShelfFactory()
    public shelves: Map<string, ShelfModel | undefined>

    constructor(spreadsheetUrls?: string) {
        this.shelves = new Map()
        this.addNewShelves(this.getSpreadsheetIdsFromUrls(spreadsheetUrls))
    }

    // TODO: MOST LOGIC IN THIS CLASS NEEDS  TO BE MOVED TO THE CONTROLLER

    public async load(reloadAll?: boolean) {
        this.loadShelves(reloadAll)
    }

    public unload() {
        this.removeOldShelves()
    }

    public updateShelves(spreadsheetUrls?: string) {
        let ids = this.getSpreadsheetIdsFromUrls(spreadsheetUrls)
        this.addNewShelves(ids)
        this.removeOldShelves(ids)
        this.loadShelves()
    }

    private getSpreadsheetIdsFromUrls(urls: string | undefined): string[] {
        let ids: string[] = []
        if (urls) {
            Array.from(urls.matchAll(spreadsheetIdPattern)).forEach(m => ids.push(m[1]))
        }
        return ids
    }

    private async loadShelves(reloadAll?: boolean) {
        let ids = Array.from(this.shelves.keys())
        let shelvesToLoad = (reloadAll) ? ids : ids.filter(id => !this.shelves.get(id))
        await Promise.all(shelvesToLoad.map(id => syncerController.getSpreadsheet(id)))
            .then(tasks => tasks.forEach(task => {
                let shelf = this.shelfFactory.createShelf(task.spreadsheet)
                if (shelf !== undefined) this.shelves.set(shelf.id, shelf)
            }))
    }

    private async addNewShelves(idsToAdd: string[]) {
        idsToAdd.filter(id => !this.shelves.has(id))
            .forEach(id => this.shelves.set(id, undefined))
    }

    private async removeOldShelves(idsToKeep?: string[]) {
        if (idsToKeep === undefined) idsToKeep = []
        Array.from(this.shelves.keys()).filter(shelfId => !idsToKeep!.includes(shelfId))
            .forEach(shelfId => this.shelves.delete(shelfId))
    }

}
