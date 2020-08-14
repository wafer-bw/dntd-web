export enum TestMode {
    OFF = "0",
    WORKING = "1",
    FAIL_GET_SPREADSHEET_SHEETS = "2",
    FAIL_GET_RANGE = "3",
    FAIL_UPDATE_RANGE = "4",
    FAIL_DELETE_ROW = "5",
    RETURN_ROWS = "6",
    DEMO = "demomode"
}

export function instanceOfTestMode(str: string): str is TestMode {
    return ((<any>Object).values(TestMode).includes(str))
}
