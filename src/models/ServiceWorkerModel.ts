import { errorsController } from "../controllers"

export class ServiceWorkerModel {
    private static instance: ServiceWorkerModel

    private constructor() {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", async () => {
                await navigator.serviceWorker.register("../serviceWorker.js")
            })
        } else {
            errorsController.add("serviceWorker not supported", "Your browser is not supported.")
        }
    }

    static getInstance(): ServiceWorkerModel {
        return (!ServiceWorkerModel.instance) ? new ServiceWorkerModel() : ServiceWorkerModel.instance
    }
}
