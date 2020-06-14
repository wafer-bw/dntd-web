import { FriendlyError } from "../helpers"

export class ServiceWorker {
    constructor() {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", async () => {
                await navigator.serviceWorker.register("../serviceWorker.js")
            })
        } else {
            throw new FriendlyError("serviceWorker not supported", "Your browser is not supported.")
        }
    }
}
