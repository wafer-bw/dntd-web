import { SearchType } from "../types"
import { entryFactory } from "../factories"
import { TagModel, BaseEntryModel, IndexedEntry } from "."

interface RefinesQuery {
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



    public entries(): IndexedEntry[] | null {
        let entries: IndexedEntry[] | null = null
        if (this.query.tokens.length === 0) {
            this.searchType = SearchType.NONE
        } else {
            this.searchType = SearchType.AND
            entries = this.search()
            if (entries.length === 0) {
                this.searchType = SearchType.OR
                entries = this.search()
            }
        }
        return entries
    }

    private search(): IndexedEntry[] {
        let query = this.query
        let entries: IndexedEntry[] = []
        let sourceEntries = journal.spreadsheet!.sheet!.entries
        for (let [idx, entry] of sourceEntries.entries()) {
            switch (this.searchType) {
                case SearchType.AND:
                    if (query.tokens.every(token => this.match(token, entry))) {
                        entries.push({ idx: idx, entry: entry })
                    }
                    break
                case SearchType.OR:
                    if (query.tokens.some(token => this.match(token, entry))) {
                        entries.push({ idx: idx, entry: entry })
                    }
                    break
            }
        }
        return entries
    }

    private match(token: string, entry: BaseEntryModel) {
        if (token.startsWith("-@") && !token.endsWith(":")) {
            return entry.tags.get(token.substring(1)) === undefined
        } else if (token.startsWith("-")) {
            return !entry.savedClean.includes(token.substring(1))
        } else if (token.startsWith("@") && !token.endsWith(":")) {
            return entry.tags.get(token) !== undefined
        } else {
            return entry.savedClean.includes(token)
        }
    }
}
