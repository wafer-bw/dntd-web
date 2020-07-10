import m from "mithril"
import { syncer } from ".."
import { TestMode } from "../types"
import { getHash } from "../helpers"

export function links() {

    function view() {
        let hash = getHash()
        let linkList: m.Vnode[] = []
        if (hash !== "#!about") linkList.push(m("a", { href: "/#!about" }, "About"))
        if (hash !== "#!demo") linkList.push(m("a", { href: "/#!demo", onclick: () => syncer.updateTestMode(TestMode.DEMO) }, "Demo"))
        if (hash !== "#!" && hash !== "") linkList.push(m("a", { href: "/#!", onclick: () => syncer.updateTestMode(TestMode.OFF) }, "Start"))
        return m("#navLinks", drawLinks(linkList))
    }

    function drawLinks(linkList: m.Vnode[]) {
        let separatedLinks = []
        for (let [idx, link] of linkList.entries()) {
            separatedLinks.push(link)
            if (idx !== linkList.length - 1) separatedLinks.push(" | ")
        }
        return separatedLinks
    }

    return { view: view }
}
