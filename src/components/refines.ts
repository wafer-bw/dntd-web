import { Tag } from "../classes"
import m, { Vnode } from "mithril"
import { journal, search } from ".."

export function refines() {
    const simpleTagsHeader = "Simple Tags"
    const expanded: Set<string> = new Set()

    function view() {
        if (journal.hideTagRefines) { return [] }
        return m("#tagsWrap", m("#tags", [
            m(".tempguidancePre", "Tags"),
            simpleRefinesVnodes(),
            complexRefinesVnodes(),
        ]))
    }

    function simpleRefinesVnodes(): Vnode {
        const { simple } = buildRefines()
        return m(".tagRefineWrap", (simple.size === 0)? [] : [
            refineKeyVnode(simpleTagsHeader, simple.size),
            Array.from(simple, ([key, tag]) => [
                refineValVnode(key, tag)
            ])
        ])
    }

    function complexRefinesVnodes(): Vnode[] {
        const { complex } = buildRefines()
        return Array.from(complex, ([key, tags]) => m(".tagRefineWrap", [
            refineKeyVnode(key, tags.length),
            tags.map(tag => [refineValVnode(key, tag)])
        ]))
    }

    function refineKeyVnode(key: string, count: number) {
        return m("span", tagRefineKeySettings(key), [
            (key === simpleTagsHeader) ? [] : m("input", { type: "checkbox", checked: search.refinesQuery.keys.has(key) }),
            (expanded.has(key)) ? m("span", "▾ ") : m("span", "▿ "),
            m("span", key),
            m("span", ` (${count})`),
        ])
    }

    function refineValVnode(key: string, tag: Tag) {
        return m("div", { class: `tagRefineValWrap` }, [
            m("span", tagRefineValSettings(key, tag), [
                m("input", { type: "checkbox", checked: (tag.val === null) ? search.refinesQuery.simpleKeys.has(tag.clean) : search.refinesQuery.vals.has(tag.clean) }),
                (tag.val !== null) ? m("span", `${tag.cleanVal}`) : m("span", `${tag.flag}${tag.cleanKey}`),
                m("span", ` (${tag.frq})`),
            ]),
        ])
    }

    function tagRefineKeySettings(key: string) {
        return {
            class: "roundTagKey",
            onclick: (event: any) => refineTagKeyOnClick(event, key),
        }
    }

    function tagRefineValSettings(key: string, tag: Tag) {
        let tagClass = (tag.val === null) ? "simpleTag" : "roundTagVal"
        let hideClass = "hide"
        if (
            (tag.val === null && expanded.has(simpleTagsHeader)) ||
            expanded.has(key) ||
            search.refinesQuery.vals.has(tag.clean)
        ) {
            hideClass = ""
        }
        return {
            class: `${tagClass} ${hideClass}`,
            onclick: () => refineTagValOnClick(tag),
        }
    }

    function refineTagKeyOnClick(event: any, key: string) {
        if (!event.metaKey && !event.ctrlKey) {
            expanded.has(key) ? expanded.delete(key) : expanded.add(key)
        } else {
            if (key === simpleTagsHeader) { return }
            search.refinesQuery.keys.has(key)
                ? search.refinesQuery.keys.delete(key)
                : search.refinesQuery.keys.add(key)
        }
    }

    function refineTagValOnClick(tag: Tag) {
        if (tag.val === null) {
            search.refinesQuery.simpleKeys.has(tag.clean)
                ? search.refinesQuery.simpleKeys.delete(tag.clean)
                : search.refinesQuery.simpleKeys.set(tag.clean, tag)
        } else {
            search.refinesQuery.vals.has(tag.clean)
                ? search.refinesQuery.vals.delete(tag.clean)
                : search.refinesQuery.vals.set(tag.clean, tag)
        }
    }

    function buildRefines() {
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

        // Clean stale simple tag key (refine val) selections
        for (let [key,] of search.refinesQuery.simpleKeys) {
            if (!simpleRefines.has(key)) {
                search.refinesQuery.simpleKeys.delete(key)
            }
        }

        // Clean stale complex tag key selections
        for (let key of search.refinesQuery.keys) {
            if (!complexRefines.has(key)) {
                search.refinesQuery.keys.delete(key)
            }
        }

        // Clean stale complex tag val
        for (let [key,] of search.refinesQuery.vals) {
            if (!Array.from(complexRefines.values()).some(tags => tags.some(tag => tag.clean === key))) {
                search.refinesQuery.vals.delete(key)
            }
        }

        return {
            simple: new Map([...simpleRefines.entries()]),
            complex: new Map([...complexRefines.entries()].sort())
        }
    }

    return { view: view }
}
