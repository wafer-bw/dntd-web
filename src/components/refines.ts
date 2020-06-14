import { Tag } from "../classes"
import m, { Vnode } from "mithril"
import { journal, search } from ".."

export function refines() {
    var expanded: Set<string> = new Set()

    function view() {
        if (journal.hideTagRefines) { return [] }
        return m("#tagsWrap", m("#tags", [
            m(".tempguidancePre", "Tags"),
            refinesVnode()
        ]))
    }

    function refinesVnode(): Vnode[] {
        const refines = buildRefines()
        return Array.from(refines, ([key, tags]) => m(".tagRefineWrap", [
            tagRefineKeyVnode(key, tags),
            tags.map(tag => [tagRefineValVnode(key, tag)])
        ]))
    }

    function tagRefineKeyVnode(key: string, tags: Tag[]) {
        return m("span", tagRefineKeySettings(key), [
            (key === "!Simple Tags") ? [] : m("input", { type: "checkbox", checked: search.refinesQuery.keys.has(key) }),
            (expanded.has(key)) ? m("span", "▾ ") : m("span", "▿ "),
            m("span", key),
            m("span", ` (${tags.length})`),
        ])
    }

    function tagRefineValVnode(key: string, tag: Tag) {
        return m("div", { class: `tagRefineValWrap` }, [
            m("span", tagRefineValSettings(key, tag), [
                m("input", { type: "checkbox", checked: search.refinesQuery.vals.has(tag.clean) }),
                (tag.val !== null)
                    ? m("span", `${tag.separator}${tag.val}`)
                    : m("span", `${tag.flag}${tag.key}`),
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
        let hideClass = (expanded.has(key) || search.refinesQuery.vals.has(tag.clean)) ? "" : "hide"
        return {
            class: `${tagClass} ${hideClass}`,
            onclick: () => refineTagValOnClick(tag),
        }
    }

    function refineTagKeyOnClick(event: any, key: string) {
        if (!event.metaKey && !event.ctrlKey) {
            expanded.has(key) ? expanded.delete(key) : expanded.add(key)
        } else {
            if (key === "!Simple Tags") { return }
            search.refinesQuery.keys.has(key)
                ? search.refinesQuery.keys.delete(key)
                : search.refinesQuery.keys.add(key)
        }
    }

    function refineTagValOnClick(tag: Tag) {
        search.refinesQuery.vals.has(tag.clean)
            ? search.refinesQuery.vals.delete(tag.clean)
            : search.refinesQuery.vals.set(tag.clean, tag)
    }

    function buildRefines() {
        let refines: Map<string, Tag[]> = new Map()
        for (let tag of journal.spreadsheet!.sheet!.tags.values()) {
            let key = (tag.val !== null) ? `${tag.flag}${tag.cleanKey}` : "!Simple Tags"
            if (!refines.has(key)) { refines.set(key, []) }
            refines.get(key)!.push(tag)
        }
        return new Map([...refines.entries()].sort())
    }

    return { view: view }
}
