import { TestMode } from "../types"

export function getHash(): string {
    let url = new URL(window.location.href)
    return url.hash
}

export function getTestMode(): TestMode {
    let url = new URL(window.location.href)
    if (url.hash === "#!demo") {
        return TestMode.DEMO
    }
    let test = url.searchParams.get("test")
    return (test !== null && instanceOfTestMode(test)) ? test : TestMode.OFF

}

function instanceOfTestMode(str: string): str is TestMode {
    return ((<any>Object).values(TestMode).includes(str))
}
