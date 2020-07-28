import { entryController } from "../controllers"
import { EntryModel, ShelfModel, JournalModel } from "../models"

export const entryFactory = {
    createEntry: createEntry
}

function createEntry(shelf: ShelfModel, journal: JournalModel, entryId: number, entryIdx: number, content: string) {
    let entry = new EntryModel(shelf, journal, entryId)
    entryController.update(entry, content)
    entryController.save(entry, entryIdx, content, true)
    return entry
}
