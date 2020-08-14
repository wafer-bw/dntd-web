import { TestMode } from "../types"

export class AppStateModel {
    public testMode: TestMode

    constructor() {
        this.testMode = TestMode.OFF
    }
}
