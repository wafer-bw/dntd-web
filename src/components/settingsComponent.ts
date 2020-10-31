import m from "mithril"
import { appStateModel, } from ".."
import { urlController, appStateController } from "../controllers"


export function settingsComponent() {
    const composeModeId = "composeMode"

    function view() {
        let journal = urlController.getActiveJournal()
        if (journal === undefined || journal.loaded === false) return
        return m("#settings", [
            m("input", entryOrderModeCheckbox()),
            m("label", { for: composeModeId }, "Compose Mode")
        ])
    }

    function entryOrderModeCheckbox() {
        return {
            id: composeModeId,
            type: "checkbox",
            checked: appStateModel.composeMode,
            onchange: (event: any) => {
                appStateController.updateComposeMode(event.target.checked)
                m.redraw()
            },
        }
    }

    return { view: view }
}
