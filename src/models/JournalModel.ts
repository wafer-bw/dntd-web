import { ShelfModel } from "./ShelfModel"
import { JournalEntryModel, TagModel } from "."
import { ViewMode } from "../types"

export class JournalModel {
    readonly id: number
    readonly title: string
    readonly shelf: ShelfModel

    public loaded: boolean
    public viewMode: ViewMode
    public tags: Map<string, TagModel>
    public entries: { id: number, entry: JournalEntryModel }[]

    constructor(shelf: ShelfModel, journalId: number, journalTitle: string) {
        this.entries = []
        this.shelf = shelf
        this.loaded = false
        this.id = journalId
        this.tags = new Map()
        this.title = journalTitle
        this.viewMode = ViewMode.COMPOSE
    }

    public createEntry(idx: number, entry: JournalEntryModel) {
        this.entries.splice(idx, 0, { id: entry.id, entry })
    }

    public deleteEntry(idx: number) {
        this.entries.splice(idx, 1)
    }

    public moveEntry(fromIdx: number, toIdx: number) {
        this.entries.splice(toIdx, 0, this.entries.splice(fromIdx, 1)[0])
    }

}
