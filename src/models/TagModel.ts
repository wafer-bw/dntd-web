import { textController } from "../controllers" // TODO: Might not want to use this like this

export class TagModel {
    public frq: number
    public raw: string
    public key: string
    public flag: string
    public clean: string
    public cleanKey: string
    public rendered : string
    public val: string | null
    public cleanVal: string | null
    public separator: string | null

    constructor(raw: string, flag: string, key: string, separator?: string | null, val?: string | null) {
        this.frq = 1
        this.raw = raw
        this.flag = flag
        this.key = key
        this.separator = (separator !== undefined) ? separator : null
        this.val = (val !== undefined) ? val : null
        this.clean = this.cleanTagString(this.raw)
        this.cleanKey = this.cleanTagString(this.key)
        this.cleanVal = (this.val !== null) ? this.cleanTagString(this.val) : null
        this.rendered = this.renderedKey() + this.renderedVal()
    }

    private renderedKey(): string {
        return "<span onclick=\"tagOnClick(event, '"
            + this.flag
            + this.cleanKey
            + ((this.separator !== null) ? this.separator : "")
            + "')\" class=\""
            + ((this.separator !== null) ? "tagKey" : (this.val === null) ? "simpleTag" : "roundTagVal")
            + "\">"
            + this.flag
            + this.key
            + "</span>"
    }

    private renderedVal(): string {
        if (this.separator === null) return ""
        return "<span onclick=\"tagOnClick(event, '"
            + this.flag
            + this.cleanKey
            + this.separator
            + ((this.cleanVal !== null) ? this.cleanVal.replace(/'/, "\\'") : "")
            + "')\" class=\"tagVal\">"
            + this.separator
            + ((this.val !== null) ? this.val : "")
            + "</span>"
    }

    private cleanTagString(str: string) {
        str = textController.escapeHtml(str)
        str = (str.endsWith("'s")) ? str.substring(0, str.length - 2) : str
        str = str.toLowerCase()
        return str
    }

}
