import { MockGapi, MockGoogleUser } from "../mocks"

class GoogleModel {

    public src: string
    public scope: string
    public clientId: string
    public isSignedIn: boolean | undefined
    public gapi_: MockGapi | typeof gapi | undefined
    public user: gapi.auth2.GoogleUser | MockGoogleUser | undefined

    constructor(isSignedIn?: boolean) {
        this.isSignedIn = isSignedIn
        this.src = "https://apis.google.com/js/api.js"
        this.scope = ["https://www.googleapis.com/auth/spreadsheets"].join(" ")
        this.clientId = "893904323330-moo1k9s19qp40kr747pftdo29ejdef0o.apps.googleusercontent.com"
    }

    public getToken(): string | undefined {
        if (this.user) {
            let auth = this.user.getAuthResponse()
            return auth.access_token
        }
        return
    }
}

export const googleModel = new GoogleModel()
