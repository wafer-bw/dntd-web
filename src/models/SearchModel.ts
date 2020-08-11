import { SearchType } from "../types"
import { entryFactory } from "../factories"
import { TagModel, BaseEntryModel } from "."

export interface RefinesQuery { // TODO: probably relocate
    keys: Set<string>,
    vals: Map<string, TagModel>,
    simpleKeys: Map<string, TagModel>
}

export class SearchModel {
    public searchType: SearchType = SearchType.NONE
    public simpleRefines: Map<string, TagModel> = new Map()
    public complexRefines: Map<string, TagModel[]> = new Map()
    public barQuery: BaseEntryModel = entryFactory.createBaseEntry()
    public refinesQuery: RefinesQuery = { keys: new Set(), vals: new Map(), simpleKeys: new Map() }

    constructor() { }

    get query(): BaseEntryModel {
        return entryFactory.createBaseEntry([
            this.barQuery.raw,
            ...Array.from(this.refinesQuery.keys.values()),
            ...Array.from(this.refinesQuery.vals.keys()),
            ...Array.from(this.refinesQuery.simpleKeys.keys())
        ].join(" "))
    }

}
