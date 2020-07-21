import { TestMode } from "../types"

export class UrlModel {

    get hash(): string {
        let url = new URL(window.location.href)
        return url.hash
    }

    get testMode(): TestMode {
        let url = new URL(window.location.href)
        if (url.hash === "#!demo") {
            return TestMode.DEMO
        }
        let test = url.searchParams.get("test")
        return (test !== null && this.instanceOfTestMode(test)) ? test : TestMode.OFF

    }

    private instanceOfTestMode(str: string): str is TestMode {
        return ((<any>Object).values(TestMode).includes(str))
    }

}
