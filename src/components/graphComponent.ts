import m from "mithril"
import cytoscape from "cytoscape"
import { urlController } from "../controllers"

export function graphComponent() {
    let cy: cytoscape.Core = cytoscape({ headless: true })
    const s = [
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(id)'
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        }
    ]

    function view() {
        const journal = urlController.getActiveJournal()
        if (journal === undefined || journal.loaded === false) return
        return m("#cy", { oncreate: vnode => initGraph(vnode.dom) }, "load graph")
    }

    function initGraph(target: Element) {
        if (target !== null) {
            cy.add([
                { data: { id: 'a' } },
                { data: { id: 'b' } },
                { data: { id: 'ab', source: 'a', target: 'b' } },
            ])
            cy.mount(target)
            cy.ready(() => { })
            cy.style(s)
            cy.layout({ name: 'grid', rows: 1 }).run()
        }
    }

    return {
        view: view,
    }
}
