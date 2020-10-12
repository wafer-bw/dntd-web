import { TestMode } from "../types"
import { ErrorsModel } from "./ErrorsModel"

export class AppStateModel {
    private static instance: AppStateModel

    public testMode: TestMode
    public errors: ErrorsModel

    private constructor() {
        this.testMode = TestMode.OFF
        this.errors = ErrorsModel.getInstance()
    }

    static getInstance(): AppStateModel {
        return (!AppStateModel.instance) ? new AppStateModel() : AppStateModel.instance
    }
}
