export function setStoredSpreadsheetId(id: string) {
    localStorage.setItem("spreadsheetId", id)
}
export function getStoredSpreadsheetId(): string | undefined {
    return localStorage.getItem("spreadsheetId") || undefined
}

export function setStoredSpreadsheetUrls(urls: string) {
    localStorage.setItem("spreadsheetUrls", urls)
}
export function getStoredSpreadsheetUrls(): string | undefined {
    return localStorage.getItem("spreadsheetUrls") || undefined
}

export function setStoredHideEntriesKeys(hide: boolean) {
    localStorage.setItem("hideEntriesKeys", (hide) ? "1": "0")
}
export function getStoredHideEntriesKeys(): boolean {
    return localStorage.getItem("hideEntriesKeys") === "1"
}

export function setStoredHideTagRefines(hide: boolean) {
    localStorage.setItem("hideTagRefines", (hide) ? "1": "0")
}
export function getStoredHideTagRefines(): boolean {
    return localStorage.getItem("hideTagRefines") === "1"
}

export function getStoredSpreadsheetSheetId(spreadsheetId: string | undefined): number | undefined {
    let sheetId = localStorage.getItem(`${spreadsheetId}-sheetId`) || undefined
    return (sheetId !== undefined) ? parseInt(sheetId) : undefined
}
export function setStoredSpreadsheetSheetId(spreadsheetId: string, sheetId: number) {
    localStorage.setItem(`${spreadsheetId}-sheetId`, sheetId.toString())
}
export function delStoredSpreadsheetSheetId(spreadsheetId: string | undefined) {
    localStorage.removeItem(`${spreadsheetId}-sheetId`)
}
