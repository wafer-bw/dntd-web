import { MockGapi, MockGoogleUser } from "../mocks"

export class GoogleModel {
    private static instance: GoogleModel

    readonly src: string
    readonly scope: string
    readonly clientId: string

    public isSignedIn: boolean | undefined
    public gapi_: MockGapi | typeof gapi | undefined
    public user: gapi.auth2.GoogleUser | MockGoogleUser | undefined

    private constructor() {
        this.isSignedIn = false
        this.src = "https://apis.google.com/js/api.js"
        this.scope = [
            "https://www.googleapis.com/auth/spreadsheets",
        ].join(" ")
        this.clientId = "893904323330-moo1k9s19qp40kr747pftdo29ejdef0o.apps.googleusercontent.com"
    }

    static getInstance() {
        return (!GoogleModel.instance) ? new GoogleModel() : GoogleModel.instance
    }

    get token(): string | undefined {
        if (!this.user) return
        let auth = this.user.getAuthResponse()
        return auth.access_token
    }
}
