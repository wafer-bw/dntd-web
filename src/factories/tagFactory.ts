import { textController } from "../controllers"
import { TagModel } from "../models"

export const tagFactory = {
    createTag: createTag
}

function createTag(raw: string, flag: string, key: string, separator?: string | null, val?: string | null) {
    separator = (separator !== undefined) ? separator : null
    val = (val !== undefined) ? val : null
    let clean = cleanTagString(raw)
    let cleanKey = cleanTagString(key)
    let cleanVal = (val !== null) ? cleanTagString(val) : null

    let renderedKey = "<span onclick=\"tagOnClick(event, '"
        + flag
        + cleanKey
        + ((separator !== null) ? separator : "")
        + "')\" class=\""
        + ((separator !== null) ? "tagKey" : (val === null) ? "simpleTag" : "roundTagVal")
        + "\">"
        + flag
        + key
        + "</span>"

    let renderedVal = ""

    if (separator !== undefined && separator !== null) {
        renderedVal = "<span onclick=\"tagOnClick(event, '"
            + flag
            + cleanKey
            + separator
            + ((cleanVal !== null) ? cleanVal.replace(/'/, "\\'") : "")
            + "')\" class=\"tagVal\">"
            + separator
            + ((val !== null) ? val : "")
            + "</span>"
    }

    return new TagModel(raw, flag, key, separator, val, clean, cleanKey, cleanVal, renderedKey + renderedVal)

}

function cleanTagString(str: string) {
    str = textController.escape(str)
    str = (str.endsWith("'s")) ? str.substring(0, str.length - 2) : str
    str = str.toLowerCase()
    return str
}
