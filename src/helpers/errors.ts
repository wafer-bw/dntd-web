import m from "mithril"
import { journal } from ".."

export class FriendlyError extends Error {
    constructor(errorMsg: string, public friendlyMsg: string) {
        super(errorMsg)
        journal.errors.push(friendlyMsg)
        console.warn(errorMsg)
        m.redraw()
    }
}
