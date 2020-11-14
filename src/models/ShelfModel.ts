import { JournalModel } from "."

export class ShelfModel {
    readonly id: string
    readonly title: string | undefined

    public error: boolean
    public journals: Map<number, JournalModel> = new Map()

    constructor(id: string, title?: string, error?: boolean) {
        this.id = id
        this.title = title
        this.error = (error === undefined) ? false : error
    }

}
