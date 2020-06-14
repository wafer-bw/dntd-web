import {
    GetRowsTask, UpdateRowTask, DeleteRowTask, GetSheetsTask, TestMode
} from "../types"

export class SyncerTasksMock {

    public extendSheetLength = 100

    constructor(private testMode: TestMode) { }

    public async getSheets(_token: string, _task: GetSheetsTask) {
        if (this.testMode === TestMode.FAIL_GET_SPREADSHEET_SHEETS) {
            throw new Error("mock fail")
        }
        return [{
            "properties": {
                "sheetId": 0,
                "title": "Sheet1",
                "index": 0,
                "sheetType": "GRID",
                "gridProperties": {
                    "rowCount": 100,
                    "columnCount": 26
                }
            }
        },
        {
            "properties": {
                "sheetId": 1,
                "title": "Sheet2",
                "index": 0,
                "sheetType": "GRID",
                "gridProperties": {
                    "rowCount": 100,
                    "columnCount": 26
                }
            }
        }]
    }

    public async getRows(_token: string, _task: GetRowsTask) {
        if (this.testMode === TestMode.FAIL_GET_RANGE) {
            throw new Error("mock fail")
        } else if (this.testMode === TestMode.RETURN_ROWS) {
            return ["aaa", "bbb", "ccc", "@tag", "@key:value"]
        }
        return []
    }

    public async updateRow(_token: string, _task: UpdateRowTask) {
        if (this.testMode === TestMode.FAIL_UPDATE_RANGE) {
            throw new Error("mock fail")
        }
    }

    public async deleteRow(_token: string, _task: DeleteRowTask) {
        if (this.testMode === TestMode.FAIL_DELETE_ROW) {
            throw new Error("mock fail")
        }
    }

}
