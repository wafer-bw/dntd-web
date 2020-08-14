import m from "mithril"
import { TestMode } from "../types"

export class UrlModel {

    get hash(): string {
        return window.location.hash
    }
    set hash(hash_: string) {
        window.location.hash = hash_
    }

    get url(): URL {
        return new URL(window.location.href)
    }

    get testMode(): TestMode | undefined {
        let mode = localStorage.getItem("testMode")
        if (mode !== null && this.instanceOfTestMode(mode)) return mode
        return
    }
    set testMode(mode: TestMode | undefined) {
        if (mode === undefined) {
            localStorage.removeItem("testMode")
        } else {
            localStorage.setItem("testMode", mode)
        }
    }

    public instanceOfTestMode(str: string): str is TestMode {
        return ((<any>Object).values(TestMode).includes(str))
    }

    public getParam(key: string): string | undefined {
        let val = this.url.searchParams.get(key) || m.route.param(key)
        if (val === "") return
        return val
    }

    get shelfId(): string | undefined {
        let id = m.route.param("shelfId")
        return (id === "") ? undefined : id
    }
    // TODO: set?

    get journalId(): number | undefined {
        let id = m.route.param("journalId")
        return (id === "") ? undefined : parseInt(id)
    }
    // TODO: set?
}
