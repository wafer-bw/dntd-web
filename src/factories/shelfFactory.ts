import { ShelfModel, JournalModel } from "../models"

export const shelfFactory = {
    createShelf: createShelf,
}

function createShelf(spreadsheetId: string, spreadsheet?: gapi.client.sheets.Spreadsheet, error?: string) {
    if (
        spreadsheet !== undefined &&
        spreadsheet.spreadsheetId !== undefined &&
        spreadsheet.properties !== undefined &&
        spreadsheet.properties.title !== undefined &&
        spreadsheet.sheets !== undefined
    ) {
        let journals = getJournals(spreadsheet.spreadsheetId, spreadsheet.sheets)
        return new ShelfModel(spreadsheet.spreadsheetId, spreadsheet.properties.title, journals)
    }
    return new ShelfModel(spreadsheetId, undefined, undefined, error)
}

function getJournals(spreadsheetId: string, sheets: gapi.client.sheets.Sheet[]) {
    let journals: JournalModel[] = []
    sheets.forEach(sheet => {
        if (
            sheet.properties !== undefined &&
            sheet.properties.title !== undefined &&
            sheet.properties.sheetId !== undefined
        ) {
            let journal = new JournalModel(
                sheet.properties.sheetId, spreadsheetId, sheet.properties.title
            )
            if (journal === undefined) return
            journals.push(journal)
        }
    })
    return journals
}
