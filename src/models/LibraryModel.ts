import { ShelfFactory, ShelfModel } from "."
import { syncerController } from "../controllers"
import { getStoredSpreadsheetUrls, spreadsheetIdPattern } from "../helpers"

class LibraryFactory {

    private shelfFactory = new ShelfFactory()

    public async createLibrary() {
        let spreadsheetUrlsString = getStoredSpreadsheetUrls()
        let spreadsheetIds = this.getSpreadsheetIdsFromUrls(spreadsheetUrlsString)
        let spreadsheets = await this.getSpreadsheets(spreadsheetIds)
        return new LibraryModel(this.getShelves(spreadsheets))
    }

    private getSpreadsheetIdsFromUrls(urls: string | undefined): string[] {
        let ids: string[] = []
        if (urls) {
            let matches = Array.from(urls.matchAll(spreadsheetIdPattern))
            matches.forEach(match => ids.push(match[1]))
        }
        return ids
    }

    private async getSpreadsheets(spreadsheetIds: string[]) {
        let spreadsheets: gapi.client.sheets.Spreadsheet[] = []
        await Promise.all(spreadsheetIds.map(
            spreadsheetId => syncerController.getSpreadsheet(spreadsheetId)
        )).then(tasks => tasks.forEach(task => {
            if (task.spreadsheet !== undefined) {
                spreadsheets.push(task.spreadsheet)
            }
        }))
        return spreadsheets
    }

    private getShelves(spreadsheets: gapi.client.sheets.Spreadsheet[]) {
        let shelves: ShelfModel[] = []
        spreadsheets.forEach(spreadsheet => {
            let shelf = this.shelfFactory.createShelf(spreadsheet)
            if (shelf === undefined) return
            shelves.push(shelf)
        })
        return shelves
    }

}

class LibraryModel {

    public shelves: ShelfModel[]

    constructor(shelvess: Promise<ShelfModel[]>) {
        shelvess.then(shelves => this.shelves = shelves)
    }

    // TODO: add/remove shelves

}

export const libraryModel = new LibraryFactory().createLibrary()
