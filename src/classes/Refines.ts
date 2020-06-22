import { Tag } from "."
import { journal, search } from ".."

export class Refines {
    public simple: Map<string, Tag> = new Map()
    public complex: Map<string, Tag[]> = new Map()

    constructor() { }

    public build() {
        let simpleRefines: Map<string, Tag> = new Map()
        let complexRefines: Map<string, Tag[]> = new Map()

        for (let tag of journal.spreadsheet!.sheet!.tags.values()) {
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

        this.simple = new Map([...simpleRefines.entries()])
        this.complex = new Map([...complexRefines.entries()].sort())

        this.cleanRefines()
    }

    private cleanRefines() {
        // Clean stale simple tag key (refine val) selections
        for (let [key,] of search.refinesQuery.simpleKeys) {
            if (!this.simple.has(key)) {
                search.refinesQuery.simpleKeys.delete(key)
            }
        }

        // Clean stale complex tag key selections
        for (let key of search.refinesQuery.keys) {
            if (!this.complex.has(key)) {
                search.refinesQuery.keys.delete(key)
            }
        }

        // Clean stale complex tag val
        for (let [key,] of search.refinesQuery.vals) {
            if (!Array.from(this.complex.values()).some(tags => tags.some(tag => tag.clean === key))) {
                search.refinesQuery.vals.delete(key)
            }
        }
    }

}