import { TagModel } from "."
import { textController } from "../controllers"  // TODO: Might not want to use this like this
import { tagFactory } from "../factories/tagFactory"

const tagPattern = /(\@)([\w-']+)+(:)?([\w-'\*]+)?/g

export type TagsMap = Map<string, TagModel>

interface TagMatch {
    tag: TagModel,
    match: RegExpMatchArray
}

export interface IndexedEntry {
    idx: number,
    entry: EntryModel,
}

export class EntryModel {
    public tags: TagsMap = new Map()
    public hovered: boolean = false
    public focused: boolean = false
    public clean: string = ""
    public tokens: string[] = []
    public rendered: string = ""
    public savedClean: string = ""
    private tagMatches: TagMatch[] = []
    public readableRendered: string = ""
    private rawText: string = ""
    private savedText: string = ""

    constructor(raw?: string | undefined, saved?: string | undefined) {
        this.raw = (raw) ? raw : ""
        this.saved = (saved !== undefined) ? saved : this.raw
    }

    public get saved(): string {
        return this.savedText
    }
    public set saved(str: string) {
        this.savedText = str
        this.savedClean = str.toLowerCase()
        this.tags = this.getTags(this.tagMatches)
    }

    public get raw(): string {
        return this.rawText
    }
    public set raw(raw: string) {
        this.rawText = raw
        this.clean = this.raw.toLowerCase()
        let safe = textController.escape(this.rawText)
        this.tokens = this.getTokens(this.clean)
        this.tagMatches = this.getTagMatches(safe)
        this.rendered = this.render(safe, this.tagMatches)
    }

    private render(text: string, tagMatches: TagMatch[]): string {
        for (let { tag, match } of tagMatches) {
            let chars = text.split("")
            chars.splice(match.index!, match[0].length, tag.rendered)
            text = chars.join("")
        }
        return text
    }

    private getTags(tagMatches: TagMatch[]): TagsMap {
        let tags: TagsMap = new Map()
        for (let { tag } of tagMatches) {
            if (tags.has(tag.clean)) {
                tags.get(tag.clean)!.frq += 1
            } else {
                tags.set(tag.clean, tag)
            }
        }
        return tags
    }

    private getTagMatches(text: string): TagMatch[] {
        let tagMatches = []
        let matchesIter = text.matchAll(tagPattern)
        for (let match of matchesIter) {
            let tag = tagFactory.createTag(match[0], match[1], match[2], match[3], match[4])
            tagMatches.push({ tag: tag, match: match })
        }
        tagMatches.sort((a, b) => (a.match.index! > b.match.index!) ? -1 : 1)
        return tagMatches
    }

    private getTokens(text: string): string[] {
        let tokens = text.split(" ")
        return tokens.filter(token => {
            return token !== undefined && token.trim() !== "" && token !== "-"
        })
    }

}
