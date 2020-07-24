import { textController } from "."
import { EntryModel, TagModel } from "../models"
import { tagFactory } from "../factories"

const tagPattern = /(\@)([\w-']+)+(:)?([\w-'\*]+)?/g

export const entryController = {
    save: save,
    update: update,

}

function save(entryModel: EntryModel, content: string) {
    entryModel.saved = content
    entryModel.savedClean = textController.clean(content)
    entryModel.tags = getTags(entryModel.tagMatches)
}

function update(entryModel: EntryModel, content: string) {
    entryModel.raw = content
    entryModel.clean = textController.clean(content)
    entryModel.safe = textController.escape(entryModel.raw)
    entryModel.tokens = tokenize(entryModel.clean)
    entryModel.tagMatches = getTagMatches(entryModel.safe)
    entryModel.rendered = render(entryModel.safe, entryModel.tagMatches)
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
