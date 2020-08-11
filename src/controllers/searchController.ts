import { searchModel } from ".."
import { SearchType } from "../types"
import { entryFactory } from "../factories"
import { entryController } from "./entryController"
import { TagModel, JournalModel, JournalEntryModel } from "../models"

export const searchController = {
    reset: reset,
    buildRefines: buildRefines,
    filteredEntries: filteredEntries,
    updateSearchbar: updateSearchbar,
}

function updateSearchbar(content: string) {
    entryController.update(searchModel.barQuery, content)
}

function reset() {
    searchModel.searchType = SearchType.NONE
    searchModel.barQuery = entryFactory.createBaseEntry()
    searchModel.refinesQuery = { keys: new Set(), vals: new Map(), simpleKeys: new Map() }
}

function buildRefines(journal: JournalModel) {
    let simpleRefines: Map<string, TagModel> = new Map()
    let complexRefines: Map<string, TagModel[]> = new Map()

    for (let tag of journal.tags.values()) {
        if (tag.val === null) {
            let key = `${tag.flag}${tag.cleanKey}`
            if (!simpleRefines.has(key)) {
                simpleRefines.set(key, tag)
            }
        } else {
            let key = `${tag.flag}${tag.cleanKey}${tag.separator}`
            if (!complexRefines.has(key)) { complexRefines.set(key, []) }
            complexRefines.get(key)!.push(tag)
        }
    }

    searchModel.simpleRefines = new Map([...simpleRefines.entries()])
    searchModel.complexRefines = new Map([...complexRefines.entries()].sort())

    cleanRefines()
}

function cleanRefines() {
    // Clean stale simple tag key (refine val) selections
    for (let [key,] of searchModel.refinesQuery.simpleKeys) {
        if (!searchModel.simpleRefines.has(key)) {
            searchModel.refinesQuery.simpleKeys.delete(key)
        }
    }

    // Clean stale complex tag key selections
    for (let key of searchModel.refinesQuery.keys) {
        if (!searchModel.complexRefines.has(key)) {
            searchModel.refinesQuery.keys.delete(key)
        }
    }

    // Clean stale complex tag val
    for (let [key,] of searchModel.refinesQuery.vals) {
        if (!Array.from(searchModel.complexRefines.values()).some(tags => tags.some(tag => tag.clean === key))) {
            searchModel.refinesQuery.vals.delete(key)
        }
    }
}

function filteredEntries(entries: { id: number, entry: JournalEntryModel }[]): JournalEntryModel[] {
    let filteredEntries: JournalEntryModel[] = []
    if (searchModel.query.tokens.length === 0) {
        searchModel.searchType = SearchType.NONE
        filteredEntries = entries.map(({ entry }) => entry)
    } else {
        searchModel.searchType = SearchType.AND
        filteredEntries = search(entries)
        if (filteredEntries.length === 0) {
            searchModel.searchType = SearchType.OR
            filteredEntries = search(entries)
        }
    }
    return filteredEntries
}

function search(entries: { id: number, entry: JournalEntryModel }[]): JournalEntryModel[] {
    let query = searchModel.query
    let sourceEntries = entries
    let filteredEntries: JournalEntryModel[] = []
    for (let { entry } of sourceEntries) {
        switch (searchModel.searchType) {
            case SearchType.AND:
                if (query.tokens.every(token => match(token, entry))) {
                    filteredEntries.push(entry)
                }
                break
            case SearchType.OR:
                if (query.tokens.some(token => match(token, entry))) {
                    filteredEntries.push(entry)
                }
                break
        }
    }
    return filteredEntries
}

function match(token: string, entry: JournalEntryModel) {
    
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
