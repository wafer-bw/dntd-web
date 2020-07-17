import m from "mithril"

export class FriendlyError extends Error {
    constructor(errorMsg: string, public friendlyMsg: string) {
        super(errorMsg)
        console.warn(errorMsg)
        // journal.errors.push(friendlyMsg) // TODO reassign
        m.redraw()
    }
}
