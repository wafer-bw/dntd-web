import { JournalModel } from "."

export class ShelfFactory {

    public createShelf(spreadsheetId: string, spreadsheet?: gapi.client.sheets.Spreadsheet, error?: string) {
        if (
            spreadsheet !== undefined &&
            spreadsheet.spreadsheetId !== undefined &&
            spreadsheet.properties !== undefined &&
            spreadsheet.properties.title !== undefined &&
            spreadsheet.sheets !== undefined
        ) {
            let journals = this.getJournals(spreadsheet.spreadsheetId, spreadsheet.sheets)
            return new ShelfModel(spreadsheet.spreadsheetId, spreadsheet.properties.title, journals)
        }
        return new ShelfModel(spreadsheetId, undefined, undefined, error)
    }

    private getJournals(spreadsheetId: string, sheets: gapi.client.sheets.Sheet[]) {
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

}

export class ShelfModel {
    public id: string
    public error: string | undefined
    public title: string | undefined
    public journals: Map<number, JournalModel> = new Map()

    constructor(id: string, title?: string, journals?: JournalModel[], error?: string) {
        this.id = id
        this.error = error
        this.title = title
        if (journals !== undefined) this.addJournals(journals)
    }

    public addJournals(journals: JournalModel[]) {
        journals.filter(journal => !this.journals.has(journal.id))
            .forEach(journal => this.journals.set(journal.id, journal))
    }

}
