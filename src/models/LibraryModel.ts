import { getStoredSpreadsheetUrls, spreadsheetIdPattern } from "../helpers"

class LibraryFactory {

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

    constructor(shelfIds: string[]) {
        this.shelfIds = shelfIds
    }

    // TODO: add/remove shelves

}

export const libraryModel = new LibraryFactory().createLibrary()
