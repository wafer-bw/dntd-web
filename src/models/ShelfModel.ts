import { JournalModel } from "."

export class ShelfModel {
    public id: string
    public error: string | undefined
    public title: string | undefined
    public journals: Map<number, JournalModel> = new Map()

    constructor(id: string, title?: string, journals?: JournalModel[], error?: string) {
        this.id = id
        this.error = error
        this.title = title
        if (journals !== undefined) journals.forEach(j => this.journals.set(j.id, j))
    }

}
