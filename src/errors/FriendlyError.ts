export class FriendlyError extends Error {
    public msg: string
    public friendlyMsg: string

    constructor(errorMsg: string, friendlyMsg: string) {
        super(errorMsg)
        this.msg = errorMsg
        this.friendlyMsg = friendlyMsg
    }
}
