import { ShelfModel } from "."

export class LibraryModel {
    public shelves: Map<string, ShelfModel | undefined>

    public x = { id: "h", shelf: undefined }

    constructor() {
        this.shelves = new Map()
        this.shelfIds.forEach(id => this.shelves.set(id, undefined))
    }

    set shelfIds(ids: string[]) {
        localStorage.setItem("spreadsheetIds", ids.join(","))
    }
    get shelfIds(): string[] {
        let ids = localStorage.getItem("spreadsheetIds")
        return (ids === null) ? [] : ids.split(",")
    }

}
