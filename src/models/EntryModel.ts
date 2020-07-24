import { TagModel } from "."

export interface IndexedEntry { // TODO see if this can be deleted
    idx: number,
    entry: EntryModel,
}

export class EntryModel {
    public raw: string = ""
    public safe: string = ""
    public saved: string = ""
    public clean: string = ""
    public tokens: string[] = []
    public rendered: string = ""
    public savedClean: string = ""
    public hovered: boolean = false
    public focused: boolean = false
    public readableRendered: string = ""
    public tags: Map<string, TagModel> = new Map()
    public tagMatches: { tag: TagModel, match: RegExpMatchArray }[] = []

    constructor(raw?: string | undefined, saved?: string | undefined) {
        this.raw = (raw) ? raw : ""
        this.saved = (saved !== undefined) ? saved : this.raw
    }

    // public get saved(): string {
    //     return this.savedText
    // }
    // public set saved(str: string) {
    //     this.savedText = str
    //     this.savedClean = str.toLowerCase()
    //     this.tags = this.getTags(this.tagMatches)
    // }

    // public get raw(): string {
    //     return this.rawText
    // }
    // public set raw(raw: string) {
    //     this.rawText = raw
    //     this.clean = this.raw.toLowerCase()
    //     let safe = textController.escape(this.rawText)
    //     this.tokens = this.getTokens(this.clean)
    //     this.tagMatches = this.getTagMatches(safe)
    //     this.rendered = this.render(safe, this.tagMatches)
    // }

    // private render(text: string, tagMatches: TagMatch[]): string {
    //     for (let { tag, match } of tagMatches) {
    //         let chars = text.split("")
    //         chars.splice(match.index!, match[0].length, tag.rendered)
    //         text = chars.join("")
    //     }
    //     return text
    // }

    // private getTags(tagMatches: TagMatch[]): TagsMap {
    //     let tags: TagsMap = new Map()
    //     for (let { tag } of tagMatches) {
    //         if (tags.has(tag.clean)) {
    //             tags.get(tag.clean)!.frq += 1
    //         } else {
    //             tags.set(tag.clean, tag)
    //         }
    //     }
    //     return tags
    // }

    // private getTagMatches(text: string): TagMatch[] {
    //     let tagMatches = []
    //     let matchesIter = text.matchAll(tagPattern)
    //     for (let match of matchesIter) {
    //         let tag = tagFactory.createTag(match[0], match[1], match[2], match[3], match[4])
    //         tagMatches.push({ tag: tag, match: match })
    //     }
    //     tagMatches.sort((a, b) => (a.match.index! > b.match.index!) ? -1 : 1)
    //     return tagMatches
    // }

    // private getTokens(text: string): string[] {
    //     let tokens = text.split(" ")
    //     return tokens.filter(token => {
    //         return token !== undefined && token.trim() !== "" && token !== "-"
    //     })
    // }

}
