import { Tag } from "../classes"
import m, { Vnode } from "mithril"
import { journal, search, refines } from ".."

export function refinesPane() {
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
        return m(".tagRefineWrap", (refines.simple.size === 0)? [] : [
            refineKeyVnode(simpleTagsHeader, refines.simple.size),
            Array.from(refines.simple, ([key, tag]) => [
                refineValVnode(key, tag)
            ])
        ])
    }

    function complexRefinesVnodes(): Vnode[] {
        return Array.from(refines.complex, ([key, tags]) => m(".tagRefineWrap", [
            refineKeyVnode(key, tags.length),
            tags.map(tag => [refineValVnode(key, tag)])
        ]))
    }

    function refineKeyVnode(key: string, count: number) {
        return m("span", tagRefineKeySettings(key), [
            (key === simpleTagsHeader)
                ? []
                : m("input", { type: "checkbox", checked: search.refinesQuery.keys.has(key) }),
            (expanded.has(key)) ? m("span", "▾ ") : m("span", "▿ "),
            m("span", key),
            m("span", ` (${count})`),
        ])
    }

    function refineValVnode(key: string, tag: Tag) {
        return m("div", { class: `tagRefineValWrap` }, [
            m("span", tagRefineValSettings(key, tag), [
                m("input", { type: "checkbox", checked: (tag.val === null)
                    ? search.refinesQuery.simpleKeys.has(tag.clean)
                    : search.refinesQuery.vals.has(tag.clean) }),
                (tag.val !== null)
                    ? m("span", `${tag.cleanVal}`)
                    : m("span", `${tag.flag}${tag.cleanKey}`),
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

    return { view: view }
}
