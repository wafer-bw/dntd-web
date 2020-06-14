import m from "mithril"
import { journal } from ".."
import {
    getStoredHideEntriesKeys, setStoredHideEntriesKeys, setStoredHideTagRefines
} from "../helpers"

export function toggles() {

    function view() {
        return [
            m("#hideEntriesKeysToggle", [
                m("label", { for: "hideEntriesCheckbox" }, "Tag keys:"),
                m("input#hideEntriesCheckbox", hideEntriesKeysSettings())
            ]),
            m("#hideTagRefinesToggle", [
                m("label", { for: "hideTagRefinesCheckbox" }, "Tag refines:"),
                m("input#hideTagRefinesCheckbox", hideTagRefinesSettings())
            ])
        ]
    }

    function hideEntriesKeysSettings() {
        return {
            type: "checkbox",
            checked: !getStoredHideEntriesKeys(),
            disabled: (journal.entryInFocus),
            onclick: () => {
                journal.hideEntriesKeys = !journal.hideEntriesKeys
                setStoredHideEntriesKeys(journal.hideEntriesKeys)
            }
        }
    }

    function hideTagRefinesSettings() {
        return {
            type: "checkbox",
            checked: !journal.hideTagRefines,
            onclick: () => {
                journal.hideTagRefines = !journal.hideTagRefines
                setStoredHideTagRefines(journal.hideTagRefines)
            }
        }
    }

    return { view: view }
}
