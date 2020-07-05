import m from "mithril"


export function journalsComponent() {

    function view() {
        let shelfId: string = m.route.param("shelfId")
        return m("#journals", ["0", "123", "456"]
            .map(journalId => m("li", m("a", { href: `#/library/${shelfId}/${journalId}` }, journalId)))
        )
    }

    return {
        view: view,
    }

}