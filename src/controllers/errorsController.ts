import { errorsModel } from ".."
import { FriendlyError } from "../errors"

export const errorsController = {
    add: add,
    remove: remove,
}

function add(errorMsg: string, friendlyMsg: string) {
    console.error(errorMsg)
    errorsModel.add(new FriendlyError(errorMsg, friendlyMsg))
}

function remove(idx: number) {
    errorsModel.remove(idx)
}
