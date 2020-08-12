import m from "mithril"
import { libraryModel } from ".."
import { ErrorPayload } from "../types"
import { FriendlyError } from "../errors"
import { JournalModel, TagModel } from "../models"
import { tagFactory, entryFactory } from "../factories"
import { syncerController, searchController, entryController } from "."

export const journalController = {
    addEntry: addEntry,
    moveEntry: moveEntry,
    buildTags: buildTags,
    deleteEntry: deleteEntry,
    loadEntries: loadEntries,
}

function unloadOtherJournals(keepJournal: JournalModel) {
    libraryModel.shelves.forEach(shelf => {
        if (shelf === undefined) return
        shelf.journals.forEach(journal => {
            if (keepJournal.shelf.id !== journal.shelf.id || keepJournal.id !== journal.id) {
                unloadEntries(journal)
            }
        })
    })
}

function unloadEntries(journal: JournalModel | undefined) {
    if (journal === undefined) return
    journal.entries = []
    journal.loaded = false
}

function loadEntries(journal: JournalModel | undefined) {
    if (journal === undefined) return
    unloadOtherJournals(journal)
    syncerController.getRows(journal.shelf.id, journal.id, journal.title)
        .then(payload => {
            payload.rows.forEach((content, idx) => addEntry(journal, idx, content, false))
            journal.loaded = true
        })
        .catch((error: ErrorPayload) => {
            new FriendlyError(error.error.message, error.friendlyMsg)
        })
        .finally(() => {
            m.redraw()
        })
}

function addEntry(journal: JournalModel, idx: number, content: string, sync?: boolean) {
    let entry = entryFactory.createJournalEntry(journal.shelf, journal, content)
    entryController.save(entry, idx, content, sync)
    journal.addEntry(idx, entry)
    buildTags(journal)
}

function deleteEntry(journal: JournalModel, idx: number) {
    journal.deleteEntry(idx)
    buildTags(journal)
}

function moveEntry(journal: JournalModel, fromIdx: number, toIdx: number) {
    if (fromIdx === toIdx) return
    journal.moveEntry(fromIdx, toIdx)
    buildTags(journal)
}

function buildTags(journal: JournalModel) {
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
    journal.tags = tags
    searchController.buildRefines(journal)
}
