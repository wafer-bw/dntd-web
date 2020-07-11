import { syncerController } from ".."
import { ShelfFactory, ShelfModel } from "."
import { getStoredSpreadsheetUrls, spreadsheetIdPattern } from "../helpers"

export class LibraryFactory {

    public createLibrary() {
        let spreadsheetUrlsString = getStoredSpreadsheetUrls()
        let spreadsheetIds = this.getSpreadsheetIdsFromUrls(spreadsheetUrlsString)
        return new LibraryModel(spreadsheetIds)
    }

    private getSpreadsheetIdsFromUrls(urls: string | undefined): string[] {
        let ids: string[] = []
        if (urls) {
            let matches = Array.from(urls.matchAll(spreadsheetIdPattern))
            matches.forEach(match => ids.push(match[1]))
        }
        return ids
    }

}

class LibraryModel {

    public shelfIds: string[]
    public shelves: ShelfModel[] = []
    private shelfFactory = new ShelfFactory()

    constructor(spreadsheetIds: string[]) {
        this.shelfIds = spreadsheetIds
    }

    public async load() {
        let spreadsheets = await this.getSpreadsheets(this.shelfIds)
        this.shelves = this.getShelves(spreadsheets)
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

    private async getSpreadsheets(spreadsheetIds: string[]) {
        let spreadsheets: gapi.client.sheets.Spreadsheet[] = []
        await Promise.all(spreadsheetIds.map(spreadsheetId => {
            return syncerController.getSpreadsheet(spreadsheetId)
        })).then(tasks => tasks.forEach(task => {
            if (task.spreadsheet !== undefined) {
                spreadsheets.push(task.spreadsheet)
            }
        }))
        return spreadsheets
    }

    // TODO: add/remove shelves

}

