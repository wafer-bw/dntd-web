import m from "mithril"
import cytoscape from "cytoscape"
import { JournalEntryModel } from "../models"
import { searchController, urlController } from "../controllers"
import { searchModel } from ".."

interface TagNodeData { score: number, }
interface TagEdgeData { score: number, source: string, target: string }

export function graphComponent() {
    const cy: cytoscape.Core = cytoscape({ headless: true })
    const s: cytoscape.Stylesheet[] = [
        {
            "selector": "node",
            "style": {
                "shape": "ellipse",
                "width": "mapData(score, 0, 1, 20, 50)",
                "height": "mapData(score, 0, 1, 20, 50)",
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
                "opacity": 1,
                "line-color": "mapData(score, 0, 1, blue, red)",
                "width": "mapData(score, 0, 1, 0.1, 3)",
                "overlay-padding": "3px",
                "target-arrow-shape": "none"
            }
        }
    ]

    function view() {
        const journal = urlController.getActiveJournal()
        if (journal === undefined || journal.loaded === false) return
        drawGraph(searchController.filteredEntries(journal.entries)
            .map(({ entry }) => entry)
        )
        return m("#graphContainer", m("#graph", {
            oncreate: vnode => mountGraph(vnode.dom)
        }))
    }

    function mountGraph(target: Element) {
        if (target !== null) {
            cy.mount(target)
        }
    }

    function graphFilterContinue(text: string) {
        for (let token of searchModel.graphFilterQuery.tokens) {
            if (token.startsWith("-") && text.includes(token.substring(1))) return true
            if (!token.startsWith("-") && !text.includes(token)) return true
        }
        return false
    }

    function drawGraph(entries: JournalEntryModel[]) {
        let tagNodes: Map<string, TagNodeData> = new Map()
        let tagEdges: Map<string, TagEdgeData> = new Map()
        for (let entry of entries) {
            for (let [, sourceTag] of entry.tags) {
                if (sourceTag.separator === undefined || sourceTag.separator === null) continue
                if (sourceTag.cleanVal === undefined || sourceTag.cleanVal === null) continue
                if (graphFilterContinue(sourceTag.clean)) continue

                let source = titleCase(sourceTag.cleanVal.toLowerCase().split("_").join(" "))
                if (!tagNodes.has(source)) {
                    tagNodes.set(source, { score: 0 })
                }
                tagNodes.get(source)!.score += 1

                for (let [, targetTag] of entry.tags) {
                    if (targetTag.cleanVal === undefined || targetTag.cleanVal === null) continue
                    if (graphFilterContinue(targetTag.clean)) continue
                    let target = titleCase(targetTag.cleanVal.toLowerCase().split("_").join(" "))
                    if (target === source) continue

                    let id = [source, target].sort().join("")
                    if (!tagEdges.has(id)) {
                        tagEdges.set(id, { source: source, target: target, score: 0 })
                    }
                    tagEdges.get(id)!.score += 1
                }
            }
        }

        let highestNodeScore = 0
        for (let [, node] of tagNodes) {
            let score = node.score / tagNodes.size
            if (score > highestNodeScore) highestNodeScore = score
            node.score = score
        }
        let hightestEdgeScore = 0
        for (let [, edge] of tagEdges) {
            let score = edge.score / tagEdges.size
            if (score > hightestEdgeScore) hightestEdgeScore = score
            edge.score = score
        }

        let els: cytoscape.ElementsDefinition = { nodes: [], edges: [] }
        for (let [id, node] of tagNodes) {
            els.nodes.push({ data: { id: id, score: node.score / highestNodeScore } })
        }
        for (let [id, edge] of tagEdges) {
            els.edges.push({ data: { id: id, score: edge.score / hightestEdgeScore, source: edge.source, target: edge.target } })
        }

        cy.elements().remove()
        cy.add(els.nodes)
        cy.add(els.edges)
        cy.style(s)
        // https://js.cytoscape.org/#layouts/cose
        let layout = {
            name: 'cose',
            idealEdgeLength: 100,
            nodeOverlap: 20,
            refresh: 20,
            fit: true,
            padding: 0,
            randomize: false,
            componentSpacing: 100,
            nodeRepulsion: 200000,
            edgeElasticity: 50,
            nestingFactor: 2,
            gravity: 50,
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

    return {
        view: view,
    }
}
