import m from "mithril"
import { links } from "."

export function about() {

    function view() {
        return m("#callToAction", [
            m(links),
            m("#about", "About page will be filled when the visual overhaul is complete.")
        ])
    }

    return { view: view }
}
