import m from "mithril"
import { googleModel } from ".."
import { MockGapi } from "../mocks"
import { TestMode } from "../types"
import { getTestMode } from "../helpers"
import { syncerController, libraryController } from "../controllers"

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
    googleModel.gapi_ = gapi_
    googleModel.gapi_.load('auth2', () => {
        googleModel.gapi_!.auth2.init({
            scope: googleModel.scope, client_id: googleModel.clientId
        }).then(() => {
            googleModel.gapi_!.auth2.getAuthInstance().isSignedIn.listen(isSignedIn)
            isSignedIn((googleModel.gapi_!.auth2.getAuthInstance().isSignedIn.get()))
        })
    })

}

async function isSignedIn(signedIn: boolean) {
    googleModel.isSignedIn = signedIn
    if (googleModel.isSignedIn) {
        googleModel.user = googleModel.gapi_!.auth2.getAuthInstance().currentUser.get()
        syncerController.updateAuth(googleModel.token)
        libraryController.loadShelves()
    } else {
        libraryController.removeShelves()
    }
    m.redraw()

    // if (getTestMode() === TestMode.DEMO) {
    //     journal.isSignedIn = true
    //     journal.load("https://docs.google.com/spreadsheets/d/demo/edit")
    //     return []
    // }
}
