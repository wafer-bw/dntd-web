import { TagModel } from "."
import { ShelfModel, JournalModel } from "../models"

export interface IndexedEntry { // TODO see if this can be deleted
    idx: number,
    entry: EntryModel,
}

export class EntryModel {
    public id: number
    public shelf: ShelfModel
    public journal: JournalModel

    public raw: string = ""
    public safe: string = ""
    public saved: string = ""
    public clean: string = ""
    public tokens: string[] = []
    public rendered: string = ""
    public savedClean: string = ""
    public readableRendered: string = ""
    public tags: Map<string, TagModel> = new Map()
    public tagMatches: { tag: TagModel, match: RegExpMatchArray }[] = []

    constructor(shelf: ShelfModel, journal: JournalModel, entryId: number) {
        this.id = entryId
        this.shelf = shelf
        this.journal = journal
    }

}
