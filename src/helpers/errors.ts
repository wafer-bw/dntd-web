import m from "mithril"
import { journal } from ".."

export class FriendlyError extends Error {
    constructor(errorMessage: string, public friendlyMessage: string) {
        super(errorMessage)
        journal.errors.push(friendlyMessage)
        console.warn(errorMessage)
        m.redraw()
    }
}
