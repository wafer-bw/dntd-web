import m from "mithril"
import { googleModel } from "../models"
import { googleController } from "../controllers"

export function googleComponent() {

    function view() {
        return m("#googleApi", [
            signInOutButton(),
            m("script", gapiScriptSettings()),
        ])
    }

    function gapiScriptSettings() {
        return { async: true, defer: true, src: googleModel.src, onload: () => { googleController.setGapi() }
        }
    }

    function signInOutButton() {
        return (googleModel.isSignedIn)
            ? m("button", { onclick: () => googleController.signOut(), class: "authButton" }, "Sign Out")
            : m("button", { onclick: () => googleController.signIn(), class: "authButton" }, "Sign In")
    }

    return { view: view }
}






// function addSpreadsheetButton() {
    //     return m("button", {
    //         id: "addSpreadsheet",
    //         onclick: async () => {
    //             journal.showAddSpreadsheetTextbox = !journal.showAddSpreadsheetTextbox
    //             if (!journal.showAddSpreadsheetTextbox) {
    //                 let spreadsheetUrls = getStoredSpreadsheetUrls()
    //                 await journal.load(spreadsheetUrls)
    //             }
    //         },
    //     }, (journal.showAddSpreadsheetTextbox) ? " ✓ " : "+/-")
    // }

    // function spreadsheetsTextbox() {
    //     return m("textarea", {
    //         id: "spreadsheetURLs",
    //         placeholder: "Enter list of Google Sheets Spreadsheet URLs here",
    //         value: getStoredSpreadsheetUrls(),
    //         oninput: (event: any) => setStoredSpreadsheetUrls(event.target.value),
    //     })
    // }

    // function spreadsheetsSelect() {
    //     return m("select", {
    //         onchange: (event: any) => {
    //             let id = event.target.value
    //             journal.switch(id, getStoredSpreadsheetSheetId(id))
    //         },
    //         id: "spreadsheetSelect",
    //     }, [
    //         Array.from(journal.spreadsheets).map(([id]) => [
    //             m("option", {
    //                 value: id,
    //                 selected: journal.spreadsheet!.id === id
    //             }, id.substr(id.length - 6))
    //         ])
    //     ])
    // }

    // function sheetsSelect() {
    //     return m("select", {
    //         onchange: (event: any) => {
    //             journal.switch(journal.spreadsheet!.id, parseInt(event.target.value))
    //             m.redraw()
    //         },
    //         id: "sheetSelect",
    //     }, [
    //         Array.from(journal.spreadsheet!.sheets).map(([id, sheet]) => [
    //             m("option", {
    //                 value: id,
    //                 selected: journal.isActive && journal.spreadsheet!.sheet!.id === id
    //             }, sheet.title)
    //         ])
    //     ])
    // }
