import m from "mithril"
import { googleModel } from "../.."
import { googleController } from "../../controllers"

export function googleComponent() {

    function view() {
        return m("#googleApi", [
            preambleMessage(),
            signInOutButton(),
            m("script", gapiScriptSettings()),
        ])
    }

    function gapiScriptSettings() {
        return {
            async: true,
            defer: true,
            src: googleModel.src,
            onload: () => {
                if (!googleModel.isSignedIn) {
                    googleController.initGapi()
                }
            }
        }
    }

    function signInOutButton() {
        return (googleModel.isSignedIn)
            ? m("button", { onclick: () => googleController.signOut(), class: "authButton" }, "Sign Out")
            : m("button", { onclick: () => googleController.signIn(), class: "authButton" }, "Sign In")
    }

    function preambleMessage() {
        return (googleModel.isSignedIn !== undefined && !googleModel.isSignedIn)
            ? m(".preamble", "PREAMBLE MSG") // TODO: fill out
            : null
    }

    return { view: view }
}
