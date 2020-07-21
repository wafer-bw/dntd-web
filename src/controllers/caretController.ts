export const caretController = {
    getCaretPosition: getCaretPosition,
    setCaretPosition: setCaretPosition,
}

function node_walk(node: any, func: any): void {
    var result = func(node)
    for (node = node.firstChild; result !== false && node; node = node.nextSibling)
        result = node_walk(node, func)
    return
}

function getCaretPosition(elem: any) {
    var sel: any = window.getSelection()
    var cum_length = [0, 0]

    if (sel.anchorNode == elem) {
        cum_length = [sel.anchorNode.innerText.length, sel.extentNode.innerText.length]
    } else {
        var nodes_to_find = [sel.anchorNode, sel.extentNode]
        if (!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode)) {
            return undefined
        } else {
            var found = [0, 0]
            var i
            node_walk(elem, function (node: any): void {
                for (i = 0; i < 2; i++) {
                    if (node == nodes_to_find[i]) {
                        found[i] = 1
                        if (found[i == 0 ? 1 : 0]) {
                            return
                        }
                    }
                }
                if (node.textContent && !node.firstChild) {
                    for (i = 0; i < 2; i++) {
                        if (!found[i]) {
                            cum_length[i] += node.textContent.length
                        }
                    }
                }
            })
            cum_length[0] += sel.anchorOffset
            cum_length[1] += sel.extentOffset
        }
    }
    if (cum_length[0] <= cum_length[1]) {
        return cum_length
    }
    return [cum_length[1], cum_length[0]]
}

function setCaretPosition(el: any, pos: any): any {
    if (el !== null && pos !== null) {
        for (var node of el.childNodes) {
            if (node.nodeType == 3) {
                if (node.length >= pos) {
                    let range = document.createRange()
                    let sel: any = window.getSelection()
                    range.setStart(node, pos)
                    range.collapse(true)
                    sel.removeAllRanges()
                    sel.addRange(range)
                    return -1
                } else {
                    pos -= node.length
                }
            } else {
                pos = setCaretPosition(node, pos)
                if (pos == -1) {
                    return -1
                }
            }
        }
        return pos
    }
}
