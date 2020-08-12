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

    get testMode(): TestMode {
        if (this.hash === "#!demo") return TestMode.DEMO
        let test = this.url.searchParams.get("test")
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
