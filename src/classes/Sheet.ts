import { Entry, Tag } from "."
import { TagsMap } from "../classes/Entry"
import { Spreadsheet } from "./Spreadsheet"
import { syncer, journal, refines } from ".."

export class Sheet {
    public id: number
    public title: string
    public spreadsheet: Spreadsheet
    public entries: Entry[] = []

    constructor(id: number, title: string, spreadsheet: Spreadsheet) {
        this.id = id
        this.title = title
        this.spreadsheet = spreadsheet
        spreadsheet.sheets.set(this.id, this)
        syncer.getRows(this.spreadsheet.id, this.id, this.title)
    }

    public async load(rows: string[]) {
        rows.map(row => this.entries.push(new Entry(row)))
        journal.switch()
        if (
            journal.spreadsheet !== null &&
            journal.spreadsheet.sheet !== null &&
            journal.spreadsheet.sheet.id === this.id
        ) {
            refines.build()
        }
    }

    get tags(): TagsMap {
        let tags: TagsMap = new Map()
        for (let entry of Array.from(this.entries.values()).reverse()) {
            for (let [key, tag] of entry.tags) {
                if (tags.has(key)) {
                    tags.get(key)!.frq += tag.frq
                } else {
                    tags.set(key, new Tag(tag.raw, tag.flag, tag.key, tag.separator, tag.val))
                }
            }
        }
        return tags
    }

}
