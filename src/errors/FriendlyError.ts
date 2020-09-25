import m from "mithril"

export class FriendlyError extends Error {
    constructor(errorMsg: string, public friendlyMsg: string) {
        super(errorMsg)
        console.warn(errorMsg)
        // TODO reassign - journal model used to hold list of errors and display them
        //                 it will need to be moved to the appropriate new model
        // journal.errors.push(friendlyMsg)
        m.redraw()
    }
}
