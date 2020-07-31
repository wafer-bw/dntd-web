import { JournalModel } from "."

export class ShelfModel {
    readonly id: string
    readonly title: string | undefined

    public error: string | undefined
    public journals: Map<number, JournalModel> = new Map()

    constructor(id: string, title?: string, error?: string) {
        this.id = id
        this.error = error
        this.title = title
    }

}
