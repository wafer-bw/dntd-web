import { Sheet } from "."
import { journal, syncer } from "../index"
import { getStoredSpreadsheetSheetId } from "../helpers"

export class Spreadsheet {
    public sheet: Sheet | null = null
    public sheets: Map<number, Sheet> = new Map()

    constructor(public id: string) {
        journal.spreadsheets.set(id, this)
        syncer.getSheets(id)
    }

    public async load(sheets: gapi.client.sheets.Sheet[]) {
        for (let sheet of sheets.sort((sheet) => (sheet.properties?.sheetId === getStoredSpreadsheetSheetId(this.id)) ? -1 : 1)) {
            if (sheet.properties !== undefined && sheet.properties.title !== undefined && sheet.properties.sheetId !== undefined) {
                new Sheet(sheet.properties.sheetId, sheet.properties.title, this)
            }
        }
    }
}
