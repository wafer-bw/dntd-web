import { EntryModel, TagModel } from "."

export class JournalModel {
    public id: number
    public title: string
    public shelfId: string
    public entryCounter: number = 0
    public tags: Map<string, TagModel>
    public entries: { id: number, entry: EntryModel }[]

    constructor(id: number, shelfId: string, title: string) {
        this.id = id
        this.entries = []
        this.title = title
        this.tags = new Map()
        this.shelfId = shelfId
    }

    public addEntry(idx: number, content: string) {
        let id = this.entryCounter += 1
        let entry = new EntryModel(content)
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
