import m from "mithril"
import { TestMode } from "../types"

export class UrlModel {

    get hash(): string {
        let url = new URL(window.location.href)
        return url.hash
    }
    set hash(hash_: string) {
        window.location.hash = hash_
    }

    get testMode(): TestMode {
        if (this.hash === "#!demo") return TestMode.DEMO
        let test = m.route.param("test")
        return (test !== null && this.instanceOfTestMode(test)) ? test : TestMode.OFF
    }

    private instanceOfTestMode(str: string): str is TestMode {
        return ((<any>Object).values(TestMode).includes(str))
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
