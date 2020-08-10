import { entryController } from "../controllers"
import { JournalEntryModel, ShelfModel, JournalModel, BaseEntryModel } from "../models"

export const entryFactory = {
    createBaseEntry: createBaseEntry,
    createJournalEntry: createJournalEntry
}

function createBaseEntry(content?: string) {
    let entry = new BaseEntryModel()
    entryController.update(entry, content || "")
    return entry
}

function createJournalEntry(shelf: ShelfModel, journal: JournalModel, entryId: number, entryIdx: number, content: string) {
    let entry = new JournalEntryModel(shelf, journal, entryId)
    entryController.update(entry, content)
    entryController.save(entry, entryIdx, content, false, true)
    return entry
}
