import { syncerController } from "../controllers"
import { getStoredSpreadsheetUrls, spreadsheetIdPattern } from "../helpers"

class LibraryFactory {

    public createLibrary() {
        let spreadsheetUrlsString = getStoredSpreadsheetUrls()
        let spreadsheetIds = this.getSpreadsheetIdsFromUrls(spreadsheetUrlsString)
        let spreadsheets = this.getSpreadsheets(spreadsheetIds)

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

    private getSpreadsheets(spreadsheetIds: string[]) {
        let spreadsheets: gapi.client.sheets.Spreadsheet[] = []
        Promise.all(spreadsheetIds.map(
            spreadsheetId => syncerController.getSpreadsheet(spreadsheetId)
        )).then(tasks => tasks.forEach(task => console.log(task)))
    }

}

class LibraryModel {

    public shelves: Shelf[]

    constructor(shelves: Shelf[]) {
        this.shelves = shelves
    }

    // TODO: add/remove shelves

}

export const libraryModel = new LibraryFactory().createLibrary()
