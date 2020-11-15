import m from "mithril"
import cytoscape from "cytoscape"
import { urlController } from "../controllers"
import { JournalModel } from "../models"

export function graphComponent() {
    let journal: JournalModel | undefined = undefined
    const cy: cytoscape.Core = cytoscape({ headless: true })
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
                'width': 1,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'none',
                'curve-style': 'straight'
            }
        }
    ]

    function view() {
        if (journal === undefined || journal.loaded === false) return
        return m("#graphContainer", m("#graph", {
            oncreate: vnode => mountGraph(vnode.dom)
        }))
    }

    function mountGraph(target: Element) {
        if (target !== null) cy.mount(target)
    }

    function onupdate() {
        let tagNodes: string[] = []
        let tagEdges: string[] = []
        let els: cytoscape.ElementsDefinition = { nodes: [], edges: [] }

        if (journal === undefined) journal = urlController.getActiveJournal()
        if (journal === undefined || journal?.loaded === false) return

        for (let entry of journal.entries) {
            for (let [sourceKey, sourceTag] of entry.entry.tags) {
                if (sourceTag.separator === undefined || sourceTag.separator === null) continue
                if (sourceTag.cleanVal === undefined || sourceTag.cleanVal === null) continue
                if (sourceKey.startsWith("@session:")) continue

                let source = sourceTag.cleanVal.toLowerCase().split("_").join(" ")
                if (!tagNodes.includes(source)) {
                    tagNodes.push(source)
                    els.nodes.push({ data: { id: source } })
                }

                for (let [targetKey, targetTag] of entry.entry.tags) {
                    if (targetTag.cleanVal === undefined || targetTag.cleanVal === null) continue
                    if (targetKey.startsWith("@session:")) continue
                    
                    let target = targetTag.cleanVal.toLowerCase().split("_").join(" ")
                    if (target === source) continue

                    let id = source + target
                    let altId = target + source
                    if (!tagEdges.includes(id) && !tagEdges.includes(altId)) {
                        tagEdges.push(id)
                        els.edges.push({ data: { id: id, source: source, target: target } })
                    }
                }
            }
        }

        cy.add(els.nodes)
        cy.add(els.edges)
        cy.style(s)
        let layout = {
            name: 'cose',
            // Called on `layoutready`
            ready: function () { },
            // Called on `layoutstop`
            stop: function () { },
            // Whether to animate while running the layout
            // true : Animate continuously as the layout is running
            // false : Just show the end result
            // 'end' : Animate with the end result, from the initial positions to the end positions
            animate: false,
            // Easing of the animation for animate:'end'
            animationEasing: undefined,
            // The duration of the animation for animate:'end'
            animationDuration: undefined,
            // A function that determines whether the node should be animated
            // All nodes animated by default on animate enabled
            // Non-animated nodes are positioned immediately when the layout starts
            animateFilter: function (_node: any, _i: any) { return true },
            // The layout animates only after this many milliseconds for animate:true
            // (prevents flashing on fast runs)
            animationThreshold: 250,
            // Number of iterations between consecutive screen positions update
            refresh: 20,
            // Whether to fit the network view after when done
            fit: true,
            // Padding on fit
            padding: 30,
            // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            boundingBox: undefined,
            // Excludes the label when calculating node bounding boxes for the layout algorithm
            nodeDimensionsIncludeLabels: true,
            // Randomize the initial positions of the nodes (true) or use existing positions (false)
            randomize: true,
            // Extra spacing between components in non-compound graphs
            componentSpacing: 50,
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: function (_node: any) { return 2048 },
            // Node repulsion (overlapping) multiplier
            nodeOverlap: 100,
            // Ideal edge (non nested) length
            idealEdgeLength: function (_edge: any) { return 32 },
            // Divisor to compute edge forces
            edgeElasticity: function (_edge: any) { return 32 },
            // Nesting factor (multiplier) to compute ideal edge length for nested edges
            nestingFactor: 1.2,
            // Gravity force (constant)
            gravity: 1,
            // Maximum number of iterations to perform
            numIter: 1000,
            // Initial temperature (maximum node displacement)
            initialTemp: 1000,
            // Cooling factor (how the temperature is reduced between consecutive iterations
            coolingFactor: 0.99,
            // Lower temperature threshold (below this point the layout will end)
            minTemp: 1.0
        }
        cy.layout(layout).run()
    }

    return {
        view: view,
        onupdate: onupdate,
    }
}
