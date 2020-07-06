import { syncerController } from "../controllers"
import { getStoredSpreadsheetUrls, spreadsheetIdPattern } from "../helpers"

class LibraryFactory {

    public createLibrary() {
        let spreadsheetUrlsString = getStoredSpreadsheetUrls()
        let spreadsheetIds = this.getSpreadsheetIdsFromUrls(spreadsheetUrlsString)
        this.getSpreadsheetsMetadata(spreadsheetIds) // TODO: #!# check this response data covers what we need and get syncerworking with a switch case for now
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

    private getSpreadsheetsMetadata(spreadsheetIds: string[]) {
        Promise.all(spreadsheetIds.map(
            spreadsheetId => syncerController.getSheets(spreadsheetId)
        )).then(tasks => tasks.forEach(task => console.log(task)))
    }

}

class LibraryModel {

    public shelfIds: string[]

    constructor(shelfIds: string[]) {
        this.shelfIds = shelfIds
    }

    // TODO: add/remove shelves

}

export const libraryModel = new LibraryFactory().createLibrary()
