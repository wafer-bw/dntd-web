import { ShelfModel } from "./ShelfModel"
import { JournalEntryModel, TagModel } from "."

export class JournalModel {
    readonly id: number
    readonly title: string
    readonly shelf: ShelfModel

    public loaded: boolean
    public tags: Map<string, TagModel>
    public entries: { id: number, entry: JournalEntryModel }[]

    constructor(shelf: ShelfModel, journalId: number, journalTitle: string) {
        this.entries = []
        this.shelf = shelf
        this.loaded = false
        this.id = journalId
        this.tags = new Map()
        this.title = journalTitle
    }

    public addEntry(idx: number, entry: JournalEntryModel) {
        this.entries.splice(idx, 0, { id: entry.id, entry })
    }

    public updateEntry(idx: number, entry: JournalEntryModel) {
        this.entries[idx].entry = entry
    }

    public deleteEntry(idx: number) {
        this.entries.splice(idx, 1)[0]
    }

    public moveEntry(fromIdx: number, toIdx: number) {
        let entry = this.entries.splice(fromIdx, 1)[0]
        this.entries.splice(toIdx, 0, entry)
    }

}
