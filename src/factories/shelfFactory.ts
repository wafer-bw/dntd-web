import { ShelfModel, JournalModel } from "../models"

export const shelfFactory = {
    createShelf: createShelf,
}

function createShelf(spreadsheetId: string, spreadsheet?: gapi.client.sheets.Spreadsheet, error?: string): ShelfModel {
    if (
        spreadsheet !== undefined &&
        spreadsheet.spreadsheetId !== undefined &&
        spreadsheet.properties !== undefined &&
        spreadsheet.properties.title !== undefined &&
        spreadsheet.sheets !== undefined
    ) {
        let shelf = new ShelfModel(spreadsheet.spreadsheetId, spreadsheet.properties.title)
        getJournals(shelf, spreadsheet.sheets).forEach(journal => shelf.journals.set(journal.id, journal))
        return shelf
    }
    return new ShelfModel(spreadsheetId, undefined, error)
}

function getJournals(shelf: ShelfModel, sheets: gapi.client.sheets.Sheet[]): JournalModel[] {
    let journals: JournalModel[] = []
    sheets.forEach(sheet => {
        if (
            sheet.properties !== undefined &&
            sheet.properties.title !== undefined &&
            sheet.properties.sheetId !== undefined
        ) {
            let journal = new JournalModel(
                shelf, sheet.properties.sheetId, sheet.properties.title
            )
            if (journal === undefined) return
            journals.push(journal)
        }
    })
    return journals
}
