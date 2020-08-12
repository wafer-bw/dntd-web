import { ShelfModel } from "."

export class LibraryModel {
    public shelves: Map<string, ShelfModel | undefined>

    constructor() {
        this.shelves = new Map()
        this.shelfIds.forEach(id => this.shelves.set(id, undefined))
    }

    set shelfIds(ids: string[]) {
        if (ids.length === 0) {
            localStorage.removeItem("spreadsheetIds")
        } else {
            localStorage.setItem("spreadsheetIds", ids.join(","))
        }
    }
    get shelfIds(): string[] {
        let ids = localStorage.getItem("spreadsheetIds")
        return (ids === null) ? [] : ids.split(",")
    }

}
