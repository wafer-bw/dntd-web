import { EntryModel, TagsMap, TagModel } from "."

export class JournalModel {
    public id: number
    public tags: TagsMap
    public title: string
    public shelfId: string
    public entries: EntryModel[] = []

    constructor(id: number, shelfId: string, title: string) {
        this.id = id
        this.title = title
        this.tags = new Map()
        this.shelfId = shelfId
    }

    private buildTags(): TagsMap {
        let tags: TagsMap = new Map()
        for (let entry of Array.from(this.entries.values()).reverse()) {
            for (let [key, tag] of entry.tags) {
                if (tags.has(key)) {
                    tags.get(key)!.frq += tag.frq
                } else {
                    tags.set(key, new TagModel(tag.raw, tag.flag, tag.key, tag.separator, tag.val))
                }
            }
        }
        return tags
    }

    public addEntry(idx: number, content: string) {
        this.entries.splice(idx, 0, new EntryModel(content))
        this.tags = this.buildTags()
    }

    public updateEntry(idx: number, content: string) {
        let entry = this.entries[idx]
        if (entry.saved === content) { return }
        entry.saved = content
        this.tags = this.buildTags()
    }

    public deleteEntry(idx: number) {
        this.entries.splice(idx, 1)[0]
        this.tags = this.buildTags()
    }

    public moveEntry(fromIdx: number, toIdx: number) {
        let entry = this.entries[fromIdx]
        this.entries.splice(fromIdx, 1)
        this.entries.splice(toIdx, 0, entry)
    }

}
