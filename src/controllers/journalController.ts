import { JournalModel, TagModel } from "../models"

export const journalController = {
    addEntry: addEntry,
    updateEntry: updateEntry,
    deleteEntry: deleteEntry,
    moveEntry: moveEntry,
}

function addEntry(journalModel: JournalModel, idx: number, content: string) {
    journalModel.addEntry(idx, content)
    journalModel.tags = buildTags(journalModel)
}

function updateEntry(journalModel: JournalModel, idx: number, content: string) {
    if (journalModel.entries[idx].entry.saved === content) return
    journalModel.updateEntry(idx, content)
    journalModel.tags = buildTags(journalModel)
}

function deleteEntry(journalModel: JournalModel, idx: number) {
    journalModel.deleteEntry(idx)
    journalModel.tags = buildTags(journalModel)
}

function moveEntry(journalModel: JournalModel, fromIdx: number, toIdx: number) {
    if (fromIdx === toIdx) return
    journalModel.moveEntry(fromIdx, toIdx)
    journalModel.tags = buildTags(journalModel)
}

function buildTags(journalModel: JournalModel): Map<string, TagModel> {
    let tags: Map<string, TagModel> = new Map()
    let entries = Array.from(journalModel.entries.values())
    for (let { entry } of entries.reverse()) {
        for (let [key, tag] of entry.tags) {
            if (tags.has(key)) {
                tags.get(key)!.frq += tag.frq
            } else {
                tags.set(key, new TagModel(tag.raw, tag.flag, tag.key, tag.separator, tag.val))
            }
        }
    }
    return tags
}
