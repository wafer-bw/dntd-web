export class MockGapi {
    public auth2 = new MockAuth2()
    public load(_api: string, _callback: () => void) {
        _callback()
    }
}

class MockAuth2 {
    public getAuthInstance() {
        return new MockGoogleAuth()
    }
    public async init(_params: any) { }
}

class MockCurrentUser {
    public get() { return new MockGoogleUser() }
}

export class MockGoogleUser {
    public getAuthResponse() {
        return {
            expires_in: 9999,
            access_token: "faketoken"
        }
    }
    public async reloadAuthResponse() {
        return {
            expires_in: 9999,
            access_token: "faketoken"
        }
    }
}

class MockGoogleAuth {
    public isSignedIn = new MockIsSignedIn()
    public signOut() { }
    public signIn() { }
    public currentUser = new MockCurrentUser()
}

class MockIsSignedIn {
    public listen = (_callback: any) => { }
    public get = () => { return true }
}
