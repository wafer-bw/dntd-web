export const storageController = {
    setSpreadsheetId: setSpreadsheetId,
    getSpreadsheetId: getSpreadsheetId,
    getSpreadsheetSheetId: getSpreadsheetSheetId,
    setSpreadsheetSheetId: setSpreadsheetSheetId,
    delSpreadsheetSheetId: delSpreadsheetSheetId,
}

function setSpreadsheetId(id: string) {
    localStorage.setItem("spreadsheetId", id)
}
function getSpreadsheetId(): string | undefined {
    return localStorage.getItem("spreadsheetId") || undefined
}

function getSpreadsheetSheetId(spreadsheetId: string | undefined): number | undefined {
    let sheetId = localStorage.getItem(`${spreadsheetId}-sheetId`) || undefined
    return (sheetId !== undefined) ? parseInt(sheetId) : undefined
}
function setSpreadsheetSheetId(spreadsheetId: string, sheetId: number) {
    localStorage.setItem(`${spreadsheetId}-sheetId`, sheetId.toString())
}
function delSpreadsheetSheetId(spreadsheetId: string | undefined) {
    localStorage.removeItem(`${spreadsheetId}-sheetId`)
}
