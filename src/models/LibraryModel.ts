import { ShelfModel } from "."

export class LibraryModel {
    public shelves: Map<string, ShelfModel | undefined>

    constructor() {
        this.shelves = new Map()
    }

    set shelfIds(ids: string[]) {
        localStorage.setItem("spreadsheetIds", ids.join(","))
    }
    get shelfIds(): string[] {
        let ids = localStorage.getItem("spreadsheetIds")
        return (ids === null) ? [] : ids.split(",")
    }

}
