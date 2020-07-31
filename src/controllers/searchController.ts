import { searchModel } from ".."
import { TagModel, JournalModel } from "../models"

export const searchController = {
    buildRefines: buildRefines,
}

function reset() {
    searchModel.barQuery = new Entry("") // TODO: use the factory
    searchModel.searchType = SearchType.NONE
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

    simpleRefines = new Map([...simpleRefines.entries()])
    complexRefines = new Map([...complexRefines.entries()].sort())

    cleanRefines()
}

function cleanRefines() {
    // Clean stale simple tag key (refine val) selections
    for (let [key,] of searchModel.refinesQuery.simpleKeys) {
        if (!this.simpleRefines.has(key)) {
            searchModel.refinesQuery.simpleKeys.delete(key)
        }
    }

    // Clean stale complex tag key selections
    for (let key of searchModel.refinesQuery.keys) {
        if (!this.complexRefines.has(key)) {
            searchModel.refinesQuery.keys.delete(key)
        }
    }

    // Clean stale complex tag val
    for (let [key,] of searchModel.refinesQuery.vals) {
        if (!Array.from(this.complexRefines.values()).some(tags => tags.some(tag => tag.clean === key))) {
            searchModel.refinesQuery.vals.delete(key)
        }
    }
}