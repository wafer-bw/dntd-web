import { TagModel } from "."
import { ShelfModel, JournalModel } from "../models"

export interface IndexedEntry { // TODO see if this can be deleted
    idx: number,
    entry: JournalEntryModel,
}

export class BaseEntryModel {
    public raw: string = ""
    public safe: string = ""
    public clean: string = ""
    public tokens: string[] = []
    public rendered: string = ""
    public tags: Map<string, TagModel> = new Map()
    public tagMatches: { tag: TagModel, match: RegExpMatchArray }[] = []
}

export class JournalEntryModel extends BaseEntryModel {
    readonly id: number
    readonly shelf: ShelfModel
    readonly journal: JournalModel

    public saved: string = ""
    public savedClean: string = ""

    constructor(shelf: ShelfModel, journal: JournalModel, entryId: number) {
        super()
        this.id = entryId
        this.shelf = shelf
        this.journal = journal
    }
}
