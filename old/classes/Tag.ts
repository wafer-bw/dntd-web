import { escapeHtml } from "../helpers"

export class Tag {
    public frq: number
    public raw: string
    public key: string
    public flag: string
    public clean: string
    public cleanKey: string
    public val: string | null
    public cleanVal: string | null
    public separator: string | null

    constructor(raw: string, flag: string, key: string, separator: string | undefined | null, val: string | undefined | null) {
        this.frq = 1
        this.raw = raw
        this.flag = flag
        this.key = key
        this.separator = (separator !== undefined) ? separator : null
        this.val = (val !== undefined) ? val : null
        this.clean = this.cleanTagString(this.raw)
        this.cleanKey = this.cleanTagString(this.key)
        this.cleanVal = (this.val !== null) ? this.cleanTagString(this.val) : null
    }

    public renderKey(): string {
        return "<span onclick=\"tagOnClick(event, '"
            + this.flag
            + this.cleanKey
            + ((this.separator) ? this.separator : "")
            + "')\" class=\""
            + ((this.separator) ? "tagKey" : (this.val === null) ? "simpleTag" : "roundTagVal")
            + "\">"
            + this.flag
            + this.key
            + "</span>"
    }

    public renderVal(hideKeys?: boolean): string {
        return "<span onclick=\"tagOnClick(event, '"
            + this.flag
            + this.cleanKey
            + this.separator
            + this.cleanVal?.replace(/'/, "\\'")
            + "')\" class=\""
            + ((hideKeys) ? "roundTagVal" : "tagVal")
            + "\">"
            + ((hideKeys) ? "" : this.separator)
            + (this.val || "")
            + "</span>"
    }

    public render(hideKeys?: boolean): string {
        if (this.separator) {
            return (hideKeys) ? this.renderVal(hideKeys) : this.renderKey() + this.renderVal(hideKeys)
        } else {
            return this.renderKey()
        }
    }

    private cleanTagString(str: string) {
        str = escapeHtml(str)
        str = (str.endsWith("'s")) ? str.substring(0, str.length - 2) : str
        str = str.toLowerCase()
        return str
    }
}
