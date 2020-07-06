export class ShelfFactory {

    public createShelf(spreadsheet: gapi.client.sheets.Spreadsheet) {
        
        return new ShelfModel(id, title, sheetIds)
    }

}

export class ShelfModel {

    public id: string
    public title: string
    public journalIds: number[]

    constructor(id: string, title: string, journalIds: number[]) {
        this.id = id
        this.title = title
        this.journalIds = journalIds
    }

    // TODO: add/remove journals

}
