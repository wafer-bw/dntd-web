import { JournalFactory, JournalModel } from "."

export class ShelfFactory {

    private journalFactory = new JournalFactory()

    public createShelf(spreadsheet: gapi.client.sheets.Spreadsheet | undefined) {
        if (
            spreadsheet &&
            spreadsheet.spreadsheetId &&
            spreadsheet.properties &&
            spreadsheet.properties.title &&
            spreadsheet.sheets
        ) {
            let journals = this.getJournals(spreadsheet.spreadsheetId, spreadsheet.sheets)
            return new ShelfModel(spreadsheet.spreadsheetId, spreadsheet.properties.title, journals)
        }
        return
    }

    private getJournals(spreadsheetId: string, sheets: gapi.client.sheets.Sheet[]) {
        let journals: JournalModel[] = []
        sheets.forEach(sheet => {
            if (sheet.properties && sheet.properties.title && sheet.properties.sheetId) {
                let journal = this.journalFactory.createJournal(
                    sheet.properties.sheetId, spreadsheetId, sheet.properties.title
                )
                if (journal === undefined) return
                journals.push(journal)
            }
        })
        return journals
    }

}

export class ShelfModel {

    public id: string
    public title: string
    public journals: Map<number, JournalModel>

    constructor(id: string, title: string, journals: JournalModel[]) {
        this.id = id
        this.title = title
        this.journals = new Map()
        journals.forEach(journal => this.journals.set(journal.id, journal))
    }

    // TODO: add/remove journals

}
