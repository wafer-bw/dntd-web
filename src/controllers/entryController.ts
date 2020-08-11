import { tagFactory } from "../factories"
import { JournalEntryModel, TagModel, BaseEntryModel } from "../models"
import { textController, syncerController } from "."

const tagPattern = /(\@)([\w-']+)+(:)?([\w-'\*]+)?/g

export const entryController = {
    save: save,
    update: update,
}

function save(entry: JournalEntryModel, entryIdx: number, content: string, sync?: boolean, force?: boolean) {
    if (entry.saved !== content || force) {
        entry.saved = content
        entry.savedClean = textController.clean(entry.saved)
        entry.tags = getTags(entry.tagMatches)
        if (sync) {
            syncerController.updateRow(entry.shelf.id, entry.journal.id, entry.journal.title, entryIdx, content)
        }
    }
}

function update(entry: BaseEntryModel | JournalEntryModel, content: string) {
    entry.raw = content
    entry.clean = textController.clean(content)
    entry.safe = textController.escape(entry.raw)
    entry.tokens = tokenize(entry.clean)
    entry.tagMatches = getTagMatches(entry.safe)
    entry.rendered = render(entry.safe, entry.tagMatches)
}

function render(text: string, tagMatches: { tag: TagModel, match: RegExpMatchArray }[]): string {
    for (let { tag, match } of tagMatches) {
        let chars = text.split("")
        chars.splice(match.index!, match[0].length, tag.rendered)
        text = chars.join("")
    }
    return text
}

function getTags(tagMatches: { tag: TagModel, match: RegExpMatchArray }[]): Map<string, TagModel> {
    let tags: Map<string, TagModel> = new Map()
    for (let { tag } of tagMatches) {
        if (tags.has(tag.clean)) {
            tags.get(tag.clean)!.frq += 1
        } else {
            tags.set(tag.clean, tag)
        }
    }
    return tags
}

function getTagMatches(text: string): { tag: TagModel, match: RegExpMatchArray }[] {
    let tagMatches = []
    let matchesIter = text.matchAll(tagPattern)
    for (let match of matchesIter) {
        let tag = tagFactory.createTag(match[0], match[1], match[2], match[3], match[4])
        tagMatches.push({ tag: tag, match: match })
    }
    tagMatches.sort((a, b) => (a.match.index! > b.match.index!) ? -1 : 1)
    return tagMatches
}

function tokenize(text: string): string[] {
    let tokens = text.split(" ")
    return tokens.filter(token => {
        return token !== undefined && token.trim() !== "" && token !== "-"
    })
}
