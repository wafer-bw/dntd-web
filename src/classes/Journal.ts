import m from "mithril"
import { Spreadsheet } from "."
import { search, syncer } from ".."
import {
    spreadsheetIdPattern, getStoredHideTagRefines, getStoredHideEntriesKeys,
    setStoredSpreadsheetId, setStoredSpreadsheetSheetId, delStoredSpreadsheetSheetId,
    getStoredSpreadsheetId, getStoredSpreadsheetSheetId
} from "../helpers"

export class Journal {
    public errors: string[] = []
    public loading: boolean = false
    public isSignedIn: boolean = false
    public entryInFocus: boolean = false
    public hideTagRefines: boolean = false
    public hideEntriesKeys: boolean = false
    public spreadsheet: Spreadsheet | null = null
    public showAddSpreadsheetTextbox: boolean = false
    public spreadsheets: Map<string, Spreadsheet> = new Map()

    constructor() { }

    public async load(spreadsheetUrls: string | undefined) {
        this.hideTagRefines = getStoredHideTagRefines()
        this.hideEntriesKeys = getStoredHideEntriesKeys()
        let incomingSpreadsheetIds = this.getSpreadsheetIdsFromUrls(spreadsheetUrls)
        await this.loadNewSpreadsheets(incomingSpreadsheetIds)
        await this.removeOldSpreadsheets(incomingSpreadsheetIds)
        this.switch()
    }

    public unload() {
        this.removeOldSpreadsheets([])
        this.errors = []
        this.loading = false
        this.isSignedIn = false
        this.entryInFocus = false
        this.hideTagRefines = false
        this.hideEntriesKeys = false
        this.spreadsheet = null
        this.showAddSpreadsheetTextbox = false
        this.spreadsheets = new Map()
    }

    get isActive(): boolean {
        return this.spreadsheet !== null && this.spreadsheet.sheet !== null && this.isSignedIn
    }

    public switch(spreadsheetId?: string | undefined, sheetId?: number | undefined) {
        if (spreadsheetId !== undefined && sheetId !== undefined && this.spreadsheet?.id === spreadsheetId && this.spreadsheet?.sheet?.id === sheetId) {
            return
        }

        if (spreadsheetId === undefined && sheetId === undefined) {
            spreadsheetId = getStoredSpreadsheetId()
            sheetId = getStoredSpreadsheetSheetId(spreadsheetId)
        }

        search.reset()

        this.spreadsheet = (spreadsheetId !== undefined && this.spreadsheets.has(spreadsheetId))
            ? this.spreadsheets.get(spreadsheetId)!
            : Array.from(this.spreadsheets.values())[0] || null

        if (this.spreadsheet !== null) {
            setStoredSpreadsheetId(this.spreadsheet.id)
            this.spreadsheet.sheet = (sheetId !== undefined && this.spreadsheet.sheets.has(sheetId))
                ? this.spreadsheet.sheets.get(sheetId)!
                : Array.from(this.spreadsheet.sheets.values())[0] || null

            if (this.spreadsheet.sheet !== null) {
                setStoredSpreadsheetSheetId(this.spreadsheet.id, this.spreadsheet.sheet.id)
            }
        }

        m.redraw()
    }

    private async loadNewSpreadsheets(spreadsheetIds: string[]) {
        for (let id of spreadsheetIds.filter(id => !this.spreadsheets.get(id)).sort(id => (id === getStoredSpreadsheetId() ? -1 : 1))) {
            new Spreadsheet(id)
        }
    }

    private async removeOldSpreadsheets(spreadsheetIds: string[]) {
        for (let [spreadsheet_id] of Array.from(this.spreadsheets).filter(([spreadsheet_id]) => !spreadsheetIds.includes(spreadsheet_id))) {
            delStoredSpreadsheetSheetId(spreadsheet_id)
            if (this.spreadsheet === this.spreadsheets.get(spreadsheet_id)) {
                this.spreadsheet = null
            }
            if (this.spreadsheets.has(spreadsheet_id)) {
                for (let [id] of this.spreadsheets.get(spreadsheet_id)!.sheets) {
                    this.spreadsheets.get(spreadsheet_id)!.sheets.delete(id)
                }
                this.spreadsheets.delete(spreadsheet_id)
            }
        }
    }

    private getSpreadsheetIdsFromUrls(urls: string | undefined): string[] {
        if (!urls) { return [] }
        let ids: string[] = []
        let matches = urls.matchAll(spreadsheetIdPattern)
        for (let match of matches) {
            if (match) { ids.push(match[1]) }
        }
        return ids
    }

    public async deleteEntry(idx: number) {
        syncer.deleteRow(idx, this.spreadsheet!.id, this.spreadsheet!.sheet!.id)
        this.spreadsheet!.sheet!.entries.splice(idx, 1)[0]
    }

    public async saveEntry(idx: number) {
        let entry = this.spreadsheet!.sheet!.entries[idx]
        if (entry.raw === entry.saved) { return }
        syncer.updateRow(idx, this.spreadsheet!.id, this.spreadsheet!.sheet!.id, this.spreadsheet!.sheet!.title, entry.raw)
        entry.saved = entry.raw
    }
}
