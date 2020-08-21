import { FriendlyError } from "../errors"

export class ServiceWorkerModel {
    private static instance: ServiceWorkerModel

    private constructor() {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", async () => {
                await navigator.serviceWorker.register("../serviceWorker.js")
            })
        } else {
            throw new FriendlyError("serviceWorker not supported", "Your browser is not supported.")
        }
    }

    static getInstance(): ServiceWorkerModel {
        return (!ServiceWorkerModel.instance) ? new ServiceWorkerModel() : ServiceWorkerModel.instance
    }
}
