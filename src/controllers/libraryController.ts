import { ShelfFactory } from "../models"
import { libraryModel, syncerController } from ".."

export class LibraryController {

    private shelfFactory = new ShelfFactory()
    private spreadsheetIdPattern = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/g

    public async load(spreadsheetUrls?: string) {
        let ids = this.getSpreadsheetIdsFromUrls(spreadsheetUrls)
        libraryModel.addNewShelves(ids)
        libraryModel.removeOldShelves(ids)
        await this.loadShelves()
    }

    public unload() {
        libraryModel.removeOldShelves()
    }

    public getSpreadsheetIdsFromUrls(urls: string | undefined): string[] {
        let ids: string[] = []
        if (urls) {
            Array.from(urls.matchAll(this.spreadsheetIdPattern)).forEach(m => ids.push(m[1]))
        }
        return ids
    }

    private async loadShelves(reloadAll?: boolean) {
        let ids = Array.from(libraryModel.shelves.keys())
        let shelvesToLoad = (reloadAll) ? ids : ids.filter(id => !libraryModel.shelves.get(id))
        await Promise.all(shelvesToLoad.map(id => syncerController.getSpreadsheet(id)))
            .then(tasks => tasks.forEach(task => {
                let shelf = this.shelfFactory.createShelf(task.spreadsheet)
                if (shelf !== undefined) libraryModel.shelves.set(shelf.id, shelf)
            }))
    }

}