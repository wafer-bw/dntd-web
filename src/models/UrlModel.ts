import m from "mithril"

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
