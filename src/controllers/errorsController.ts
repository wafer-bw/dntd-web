import { appStateModel } from ".."
import { FriendlyError } from "../errors"

export const errorsController = {
    add: add,
    remove: remove,
}

function add(errorMsg: string, friendlyMsg: string) {
    console.error(errorMsg)
    appStateModel.errors.add(new FriendlyError(errorMsg, friendlyMsg))
}

function remove(idx: number) {
    appStateModel.errors.remove(idx)
}
