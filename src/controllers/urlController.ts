import m from "mithril"
import { libraryModel, urlModel } from ".."

export const urlController = {
    redirect: redirect,
    getBreadcrumbTrail: getBreadcrumbTrail,
}

function redirect(hash: string) {
    window.location.hash = `#${hash}`
}

function getBreadcrumbTrail() {
    // TODO: add dropdowns on each shelf and journal crumb
    let breadcrumb: m.Vnode[] = []
    let hash = urlModel.hash.split("/").filter(crumb => crumb !== "#" && crumb !== "")
    let shelfId: string | undefined = undefined
    for (let i = 0; i < hash.length; i++) {
        let crumb = hash[i]
        let trail = "#/" + hash.slice(0, i + 1).join("/")
        if (i === 1) {
            shelfId = crumb
            crumb = libraryModel.shelves.get(crumb)?.title || crumb
        } else if (i === 2 && shelfId !== undefined) {
            crumb = libraryModel.shelves.get(shelfId)?.journals.get(parseInt(crumb))?.title || crumb
        }
        if (i !== 0) breadcrumb.push(m("span", " / "))
        if (i === hash.length - 1) {
            breadcrumb.push(m("span", `${crumb}`))
        } else {
            breadcrumb.push(m("a", { href: trail }, `${crumb}`))
        }
    }
    return breadcrumb
}
