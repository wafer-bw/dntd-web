import { FriendlyError } from "../errors"

export class ErrorsModel {
    private static instance: ErrorsModel

    public errors: FriendlyError[] = []

    private constructor() {}

    add(error: FriendlyError) {
        this.errors.push(error)
    }

    remove(idx: number) {
        this.errors.splice(idx, 1)
    }

    static getInstance(): ErrorsModel {
        return (!ErrorsModel.instance) ? new ErrorsModel() : ErrorsModel.instance
    }
}
