export class ShelfFactory {

    public createShelf(id: string, sheetIds: number[]) {
        return new ShelfModel(id, sheetIds)
    }

}

export class ShelfModel {

    public id: string
    public journalIds: number[]

    constructor(id: string, journalIds: number[]) {
        this.id = id
        this.journalIds = journalIds
    }

    // TODO: add/remove journals

}
