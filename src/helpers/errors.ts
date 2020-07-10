import m from "mithril"

export class FriendlyError extends Error {
    constructor(errorMsg: string, public friendlyMsg: string) {
        super(errorMsg)
        // journal.errors.push(friendlyMsg) // TODO reassign
        console.warn(errorMsg)
        m.redraw()
    }
}
