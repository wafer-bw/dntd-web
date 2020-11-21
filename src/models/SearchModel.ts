import { SearchType } from "../types"
import { entryFactory } from "../factories"
import { TagModel, BaseEntryModel } from "."

export class SearchModel {
    private static instance: SearchModel

    public searchType: SearchType = SearchType.NONE
    public simpleRefines: Map<string, TagModel> = new Map()
    public complexRefines: Map<string, TagModel[]> = new Map()
    public barQuery: BaseEntryModel = entryFactory.createBaseEntry()
    public graphFilter: BaseEntryModel = entryFactory.createBaseEntry()
    public refinesQuery: {
        keys: Set<string>,
        vals: Map<string, TagModel>,
        simpleKeys: Map<string, TagModel>
    } = { keys: new Set(), vals: new Map(), simpleKeys: new Map() }

    private constructor() { }

    static getInstance(): SearchModel {
        return (!SearchModel.instance) ? new SearchModel() : SearchModel.instance
    }

    get graphFilterQuery(): BaseEntryModel {
        return entryFactory.createBaseEntry(this.graphFilter.raw)
    }

    get query(): BaseEntryModel {
        return entryFactory.createBaseEntry([
            this.barQuery.raw,
            ...Array.from(this.refinesQuery.keys.values()),
            ...Array.from(this.refinesQuery.vals.keys()),
            ...Array.from(this.refinesQuery.simpleKeys.keys())
        ].join(" "))
    }
}
