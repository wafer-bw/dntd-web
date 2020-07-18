import { ShelfModel } from "."

export class LibraryModel {
    public shelves: Map<string, ShelfModel | undefined>

    constructor() {
        this.shelves = new Map()
        this.shelfIds.forEach(id => this.shelves.set(id, undefined))
    }

    set shelfIds(ids: string[]) {
        localStorage.setItem("spreadsheetIds", ids.join(","))
    }
    get shelfIds(): string[] {
        let ids = localStorage.getItem("spreadsheetIds") || undefined
        if (ids === undefined) return []
        return ids.split(",")
    }

}
