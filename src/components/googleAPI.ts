import m from "mithril"
import { MockGapi } from "../mocks"
import { TestMode } from "../types"
import { journal, testMode, syncer } from ".."
import {
    getStoredSpreadsheetUrls, getStoredSpreadsheetSheetId, setStoredSpreadsheetUrls
} from "../helpers"

const scope = ["https://www.googleapis.com/auth/spreadsheets"].join(" ")
const clientId = "893904323330-moo1k9s19qp40kr747pftdo29ejdef0o.apps.googleusercontent.com"

export function googleAPI() {
    var gapi_: MockGapi | typeof gapi

    function gapiScriptSettings() {
        return {
            async: true, defer: true, src: "https://apis.google.com/js/api.js",
            onload: () => {
                gapi_ = (testMode === TestMode.OFF) ? gapi : new MockGapi()
                gapi_.load('auth2', initClient)
            }
        }
    }

    function initClient() {
        gapi_.auth2.init({
            scope: scope,
            client_id: clientId
        }).then(() => {
            gapi_.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
            updateSigninStatus(gapi_.auth2.getAuthInstance().isSignedIn.get())
        })
    }

    async function updateSigninStatus(signedIn: boolean) {
        journal.isSignedIn = signedIn
        m.redraw()
        if (journal.isSignedIn) {
            let user = gapi_.auth2.getAuthInstance().currentUser.get()
            syncer.user = user
            let auth = user.getAuthResponse()
            syncer.updateAuth(auth.access_token)
            await initJournal()
        } else {
            journal.unload()
        }
    }

    async function initJournal() {
        let spreadsheetUrls = getStoredSpreadsheetUrls()
        await journal.load(spreadsheetUrls)
    }

    function view() {
        if (testMode === TestMode.DEMO) {
            journal.isSignedIn = true
            journal.load("https://docs.google.com/spreadsheets/d/demo/edit")
            return []
        } else {
            return m("#googleApi", [
                (journal.showAddSpreadsheetTextbox) ? [spreadsheetsTextbox(), m("br")] : [],
                (journal.isSignedIn) ? addSpreadsheetButton() : [],
                (journal.spreadsheet !== null) ? spreadsheetsSelect() : [],
                (journal.isActive) ? sheetsSelect() : [],
                signInOutButton(),
                m("script", gapiScriptSettings()),
            ])
        }
    }

    function signInOutButton() {
        return (journal.isSignedIn)
            ? m("button", {
                onclick: () => {
                    if (testMode === TestMode.RETURN_ROWS) { journal.unload() }
                    gapi_.auth2.getAuthInstance().signOut()
                }, class: "authButton"
            }, "Sign Out")
            : m("button", { onclick: () => gapi_.auth2.getAuthInstance().signIn(), class: "authButton" }, "Sign In")
    }

    function addSpreadsheetButton() {
        return m("button", {
            id: "addSpreadsheet",
            onclick: async () => {
                journal.showAddSpreadsheetTextbox = !journal.showAddSpreadsheetTextbox
                if (!journal.showAddSpreadsheetTextbox) {
                    let spreadsheetUrls = getStoredSpreadsheetUrls()
                    await journal.load(spreadsheetUrls)
                }
            },
        }, (journal.showAddSpreadsheetTextbox) ? " ✓ " : "+/-")
    }

    function spreadsheetsTextbox() {
        return m("textarea", {
            id: "spreadsheetURLs",
            placeholder: "Enter list of Google Sheets Spreadsheet URLs here",
            value: getStoredSpreadsheetUrls(),
            oninput: (event: any) => setStoredSpreadsheetUrls(event.target.value),
        })
    }

    function spreadsheetsSelect() {
        return m("select", {
            onchange: (event: any) => {
                let id = event.target.value
                journal.switch(id, getStoredSpreadsheetSheetId(id))
            },
            id: "spreadsheetSelect",
        }, [
            Array.from(journal.spreadsheets).map(([id]) => [
                m("option", {
                    value: id,
                    selected: journal.spreadsheet!.id === id
                }, id.substr(id.length - 6))
            ])
        ])
    }

    function sheetsSelect() {
        return m("select", {
            onchange: (event: any) => {
                journal.switch(journal.spreadsheet!.id, parseInt(event.target.value))
                m.redraw()
            },
            id: "sheetSelect",
        }, [
            Array.from(journal.spreadsheet!.sheets).map(([id, sheet]) => [
                m("option", {
                    value: id,
                    selected: journal.isActive && journal.spreadsheet!.sheet!.id === id
                }, sheet.title)
            ])
        ])
    }

    return { view: view }
}
