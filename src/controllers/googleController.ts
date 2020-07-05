import m from "mithril"
import { MockGapi } from "../mocks"
import { TestMode } from "../types"
import { googleModel } from "../models"
import { getTestMode } from "../helpers"

export const googleController = {
    signIn: signIn,
    signOut: signOut,
    initGapi: initGapi,
}

function signOut() {
    googleModel.gapi_!.auth2.getAuthInstance().signOut()
}

function signIn() {
    googleModel.gapi_!.auth2.getAuthInstance().signIn()
}

function initGapi() {
    let gapi_ = (getTestMode() === TestMode.OFF) ? gapi : new MockGapi()
    gapi_.load('auth2', () => {
        gapi_.auth2.init({
            scope: googleModel.scope, client_id: googleModel.clientId
        }).then(() => {
            gapi_.auth2.getAuthInstance().isSignedIn.listen(isSignedIn)
            isSignedIn((gapi_.auth2.getAuthInstance().isSignedIn.get()))
        })
    })
    googleModel.gapi_ = gapi_
}

function isSignedIn(signedIn: boolean) {
    googleModel.isSignedIn = signedIn
    m.redraw()

    // journal.isSignedIn = signedIn
    // m.redraw()
    // if (journal.isSignedIn) {
    //     let user = gapi_.auth2.getAuthInstance().currentUser.get()
    //     syncer.user = user
    //     let auth = user.getAuthResponse()
    //     syncer.updateAuth(auth.access_token)
    //     await initJournal()
    // } else {
    //     journal.unload()
    // }

    // async function initJournal() {
    //     let spreadsheetUrls = getStoredSpreadsheetUrls()
    //     await journal.load(spreadsheetUrls)
    // }

    // if (getTestMode() === TestMode.DEMO) {
    //     journal.isSignedIn = true
    //     journal.load("https://docs.google.com/spreadsheets/d/demo/edit")
    //     return []
    // }
}
