import m from "mithril"
import { ErrorPayload } from "../types"
import { tagFactory } from "../factories"
import { FriendlyError } from "../errors"
import { JournalModel, TagModel } from "../models"
import { syncerController } from "./syncerController"

export const journalController = {
    addEntry: addEntry,
    moveEntry: moveEntry,
    updateEntry: updateEntry,
    deleteEntry: deleteEntry,
    loadEntries: loadEntries,
    unloadEntries: unloadEntries,
}

// TODO: Unload entries when navigating away from journal
function unloadEntries(journal: JournalModel | undefined) {
    if (journal === undefined) return
    journal.entries = []
    journal.loaded = false
}

function loadEntries(journal: JournalModel | undefined) {
    if (journal === undefined) return
    syncerController.getRows(journal.shelf.id, journal.id, journal.title)
        .then(payload => {
           payload.rows.forEach((content, idx) => journal.addEntry(idx, content))
           journal.loaded = true
        })
        .catch((error: ErrorPayload) => {
            new FriendlyError(error.error.message, error.friendlyMsg)
        })
        .finally(() => {
            m.redraw()
        })
}

function addEntry(journal: JournalModel, idx: number, content: string) {
    journal.addEntry(idx, content)
    journal.tags = buildTags(journal)
}

function updateEntry(journal: JournalModel, idx: number, content: string) {
    if (journal.entries[idx].entry.saved === content) return
    journal.updateEntry(idx, content)
    journal.tags = buildTags(journal)
}

function deleteEntry(journal: JournalModel, idx: number) {
    journal.deleteEntry(idx)
    journal.tags = buildTags(journal)
}

function moveEntry(journal: JournalModel, fromIdx: number, toIdx: number) {
    if (fromIdx === toIdx) return
    journal.moveEntry(fromIdx, toIdx)
    journal.tags = buildTags(journal)
}

function buildTags(journal: JournalModel): Map<string, TagModel> {
    let tags: Map<string, TagModel> = new Map()
    let entries = Array.from(journal.entries.values())
    for (let { entry } of entries.reverse()) {
        for (let [key, tag] of entry.tags) {
            if (tags.has(key)) {
                tags.get(key)!.frq += tag.frq
            } else {
                tags.set(key, tagFactory.createTag(tag.raw, tag.flag, tag.key, tag.separator, tag.val))
            }
        }
    }
    return tags
}
