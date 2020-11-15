import m from "mithril"
import cytoscape from "cytoscape"
import { urlController } from "../controllers"
import { JournalModel } from "../models"

interface TagNodeData { score: number, }
interface TagEdgeData { weight: number, source: string, target: string }

export function graphComponent() {
    const cy: cytoscape.Core = cytoscape({ headless: true })
    const s: cytoscape.Stylesheet[] = [
        {
            "selector": "node",
            "style": {
                "shape": "ellipse",
                "width": "mapData(score, 0, 1, 25, 90)",
                "height": "mapData(score, 0, 1, 25, 90)",
                "content": "data(id)",
                "font-size": "12px",
                "text-valign": "center",
                "text-halign": "center",
                "background-color": "#555",
                "text-outline-color": "#555",
                "text-outline-width": "2px",
                "color": "#fff",
                "overlay-padding": "6px",
                "z-index": 10,
            }
        },
        {
            "selector": "edge",
            "style": {
                "curve-style": "straight",
                "opacity": 0.4,
                "line-color": "mapData(weight, 0, 1, blue, red)",
                "width": "mapData(weight, 0, 1, 1, 12)",
                "overlay-padding": "3px",
                "target-arrow-shape": "none"
            }
        }
    ]

    function view() {
        const journal = urlController.getActiveJournal()
        if (journal === undefined || journal.loaded === false) return
        drawGraph(journal)
        return m("#graphContainer", m("#graph", {
            oncreate: vnode => mountGraph(vnode.dom)
        }))
    }

    function mountGraph(target: Element) {
        if (target !== null) cy.mount(target)
    }

    function drawGraph(journal: JournalModel) {
        let connectionCounts: Map<string, number> = new Map()
        let tagNodes: Map<string, TagNodeData> = new Map()
        let tagEdges: Map<string, TagEdgeData> = new Map()
        for (let {entry} of journal.entries) {
            for (let [sourceKey, sourceTag] of entry.tags) {
                if (sourceTag.separator === undefined || sourceTag.separator === null) continue
                if (sourceTag.cleanVal === undefined || sourceTag.cleanVal === null) continue
                if (sourceKey.startsWith("@session:")) continue

                let source = titleCase(sourceTag.cleanVal.toLowerCase().split("_").join(" "))
                if (!tagNodes.has(source)) {
                    tagNodes.set(source, { score: 0 })
                }
                tagNodes.get(source)!.score += 1

                for (let [targetKey, targetTag] of entry.tags) {
                    if (targetTag.cleanVal === undefined || targetTag.cleanVal === null) continue
                    if (targetKey.startsWith("@session:")) continue

                    let target = titleCase(targetTag.cleanVal.toLowerCase().split("_").join(" "))
                    if (target === source) continue

                    if (!connectionCounts.has(target)) connectionCounts.set(target, 0)
                    if (!connectionCounts.has(source)) connectionCounts.set(source, 0)

                    let id = [source, target].sort().join("")
                    if (!tagEdges.has(id)) {
                        tagEdges.set(id, { source: source, target: target, weight: 0 })
                    }
                    tagEdges.get(id)!.weight += 1
                    connectionCounts.set(source, connectionCounts.get(source)! + 1)
                    connectionCounts.set(target, connectionCounts.get(target)! + 1)
                }
            }
        }

        let els: cytoscape.ElementsDefinition = { nodes: [], edges: [] }
        for (let [id, node] of tagNodes) {
            els.nodes.push({ data: { id: id, score: node.score / tagNodes.size } })
        }
        for (let [id, edge] of tagEdges) {
            let connections = connectionCounts.get(edge.source)! + connectionCounts.get(edge.target)!
            els.edges.push({ data: { id: id, weight: edge.weight / connections, source: edge.source, target: edge.target } })
        }

        cy.add(els.nodes)
        cy.add(els.edges)
        cy.style(s)
        let layout = {
            name: 'cose',
            idealEdgeLength: 100,
            nodeOverlap: 20,
            refresh: 20,
            fit: true,
            padding: 30,
            randomize: false,
            componentSpacing: 100,
            nodeRepulsion: 900000,
            edgeElasticity: 100,
            nestingFactor: 5,
            gravity: 80,
            numIter: 1000,
            initialTemp: 500,
            coolingFactor: 0.95,
            minTemp: 2,
            nodeDimensionsIncludeLabels: true
        }
        cy.layout(layout).run()
    }

    function titleCase(s: string) {
        return s.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
    }

    return { view: view }
}
