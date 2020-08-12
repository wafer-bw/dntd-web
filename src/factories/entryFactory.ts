import { entryController } from "../controllers"
import { JournalEntryModel, ShelfModel, JournalModel, BaseEntryModel } from "../models"

let entryCounter = -1

export const entryFactory = {
    createBaseEntry: createBaseEntry,
    createJournalEntry: createJournalEntry
}

function createBaseEntry(content?: string) {
    let entry = new BaseEntryModel()
    entryController.update(entry, content || "")
    return entry
}

function createJournalEntry(shelf: ShelfModel, journal: JournalModel, content: string) {
    let entry = new JournalEntryModel(shelf, journal, entryCounter += 1)
    entryController.update(entry, content)
    return entry
}
