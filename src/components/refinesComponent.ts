import m from "mithril"
import { searchModel } from ".."
import { urlController } from "../controllers"
import { TagModel } from "../models"

export function refinesComponent() {
    const simpleTagsHeader = "Simple Tags"
    const expanded: Set<string> = new Set()

    function view() {
        const journal = urlController.getActiveJournal()
        if (journal === undefined || journal.loaded === false) return
        return m("#tagsWrap", m("#tags", [
            m(".tempguidancePre", "Tags"),
            simpleRefinesVnodes(),
            complexRefinesVnodes(),
        ]))
    }

    function simpleRefinesVnodes() {
        if (searchModel.simpleRefines.size === 0) return
        return m(".tagRefineWrap", [
            refineKeyVnode(simpleTagsHeader, searchModel.simpleRefines.size),
            Array.from(searchModel.simpleRefines, ([key, tag]) => [
                refineValVnode(key, tag)
            ])
        ])
    }

    function complexRefinesVnodes(): m.Vnode[] {
        return Array.from(searchModel.complexRefines, ([key, tags]) => m(".tagRefineWrap", [
            refineKeyVnode(key, tags.length),
            tags.map(tag => [refineValVnode(key, tag)])
        ]))
    }

    function refineKeyVnode(key: string, count: number) {
        return m("span", tagRefineKeySettings(key), [
            (key === simpleTagsHeader)
                ? []
                : m("input", { type: "checkbox", checked: searchModel.refinesQuery.keys.has(key) }),
            (expanded.has(key)) ? m("span", "▾ ") : m("span", "▿ "),
            m("span", key),
            m("span", ` (${count})`),
        ])
    }

    function refineValVnode(key: string, tag: TagModel) {
        return m("div", { class: `tagRefineValWrap` }, [
            m("span", tagRefineValSettings(key, tag), [
                m("input", {
                    type: "checkbox", checked: (tag.val === null)
                        ? searchModel.refinesQuery.simpleKeys.has(tag.clean)
                        : searchModel.refinesQuery.vals.has(tag.clean)
                }),
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

    function tagRefineValSettings(key: string, tag: TagModel) {
        let tagClass = (tag.val === null) ? "simpleTag" : "roundTagVal"
        let hideClass = "hide"
        if (
            (tag.val === null && expanded.has(simpleTagsHeader)) ||
            expanded.has(key) ||
            searchModel.refinesQuery.vals.has(tag.clean)
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
            searchModel.refinesQuery.keys.has(key)
                ? searchModel.refinesQuery.keys.delete(key)
                : searchModel.refinesQuery.keys.add(key)
        }
    }

    function refineTagValOnClick(tag: TagModel) {
        if (tag.val === null) {
            searchModel.refinesQuery.simpleKeys.has(tag.clean)
                ? searchModel.refinesQuery.simpleKeys.delete(tag.clean)
                : searchModel.refinesQuery.simpleKeys.set(tag.clean, tag)
        } else {
            searchModel.refinesQuery.vals.has(tag.clean)
                ? searchModel.refinesQuery.vals.delete(tag.clean)
                : searchModel.refinesQuery.vals.set(tag.clean, tag)
        }
    }

    return { view: view }
}
