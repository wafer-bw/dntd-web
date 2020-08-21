import { ShelfModel } from "."

export class LibraryModel {
    private static instance: LibraryModel
    
    public shelves: Map<string, ShelfModel | undefined>

    private constructor() {
        this.shelves = new Map()
        this.shelfIds.forEach(id => this.shelves.set(id, undefined))
    }

    static getInstance() {
        return (!LibraryModel.instance) ? new LibraryModel() : LibraryModel.instance
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
