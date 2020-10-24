import m from "mithril"
import { libraryModel } from ".."
import { tagFactory, entryFactory } from "../factories"
import { JournalEntryModel, JournalModel, TagModel } from "../models"
import { syncerController, searchController, entryController } from "."

export const journalController = {
    addEntry: addEntry,
    createEntry: createEntry,
    updateEntry: updateEntry,
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
            payload.rows.forEach((content, idx) => addEntry(journal, idx, content))
            journal.loaded = true
            m.redraw()
        })
}

function addEntry(journal: JournalModel, idx: number, content: string | undefined) {
    content = (content === undefined) ? "" : content
    let entry = entryFactory.createJournalEntry(journal.shelf, journal, content)
    journal.createEntry(idx, entry)
    entryController.save(entry, content)
    buildTags(journal)
}

function createEntry(journal: JournalModel, idx: number, content?: string) {
    content = (content === undefined) ? "" : content
    let entry = entryFactory.createJournalEntry(journal.shelf, journal, content)
    journal.createEntry(idx, entry)
    entryController.save(entry, content)
    syncerController.createRow(journal.shelf.id, journal.id, idx)
    syncerController.updateRow(journal.shelf.id, journal.id, journal.title, idx, entry.raw)
    buildTags(journal)
}

function updateEntry(journal: JournalModel, entry: JournalEntryModel, idx: number, content: string) {
    if (entry.saved === content) return
    entryController.save(entry, content)
    syncerController.updateRow(journal.shelf.id, journal.id, journal.title, idx, entry.raw)
    buildTags(journal)
}

function deleteEntry(journal: JournalModel, idx: number) {
    journal.deleteEntry(idx)
    syncerController.deleteRow(journal.shelf.id, journal.id, idx)
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
