import { JournalEntryModel, TagModel } from "."
import { entryFactory } from "../factories"
import { ShelfModel } from "./ShelfModel"

export class JournalModel {
    readonly id: number
    readonly title: string
    readonly shelf: ShelfModel

    public loaded: boolean
    public entryCounter: number
    public tags: Map<string, TagModel>
    public entries: { id: number, entry: JournalEntryModel }[]

    constructor(shelf: ShelfModel, journalId: number, journalTitle: string) {
        this.entries = []
        this.shelf = shelf
        this.loaded = false
        this.id = journalId
        this.tags = new Map()
        this.entryCounter = 0
        this.title = journalTitle
    }

    public addEntry(idx: number, content: string) {
        let id = this.entryCounter += 1
        let entry = entryFactory.createJournalEntry(this.shelf, this, id, idx, content)
        this.entries.splice(idx, 0, { id, entry })
    }

    public updateEntry(idx: number, content: string) {
        this.entries[idx].entry.saved = content
    }

    public deleteEntry(idx: number) {
        this.entries.splice(idx, 1)[0]
    }

    public moveEntry(fromIdx: number, toIdx: number) {
        let entry = this.entries.splice(fromIdx, 1)[0]
        this.entries.splice(toIdx, 0, entry)
    }

}
