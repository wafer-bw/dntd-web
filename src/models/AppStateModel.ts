import { TestMode } from "../types"

export class AppStateModel {
    private static instance: AppStateModel

    public testMode: TestMode

    private constructor() {
        this.testMode = TestMode.OFF
    }

    static getInstance(): AppStateModel {
        return (!AppStateModel.instance) ? new AppStateModel() : AppStateModel.instance
    }
}
