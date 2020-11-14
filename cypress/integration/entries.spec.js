import { preTest, confirmEntryPresenceByIndex, delEntriesByID, delEntryByIndex, goToJournal } from "."

context("Entries Tests", () => {

    before(() => {
        preTest("1")
        goToJournal("1", 0)
    })

    it("Creates, updates, and deletes entries", function () {
        // Create
        cy.get("#content").type("hello world{enter}")
        cy.contains("#entry-0-content", "hello world")
        cy.get("#content").type("test entry{enter}")
        cy.contains("#entry-1-content", "test entry")
        // Insert
        cy.get("#createEntry-1").click()
        cy.get("#entry-2-content").type("inserted entry{enter}")
        cy.contains("#entry-0-content", "hello world")
        cy.contains("#entry-2-content", "inserted entry")
        cy.contains(".entry-idx-1-content", "inserted entry")
        cy.contains("#entry-1-content", "test entry")
        cy.contains(".entry-idx-2-content", "test entry")
        // Update
        cy.get("#entry-0-content").type("!{enter}")
        cy.contains("#entry-0-content", "hello world!")
        // Delete
        delEntriesByID([0, 1, 2])
        cy.get("#entry-0").should("not.exist")
        cy.get("#entry-idx-0").should("not.exist")
    })

    it("Deletes correct entries", function () {
        cy.get("#content").type("aaa{enter}")
        cy.get("#content").type("bbb{enter}")
        cy.get("#content").type("ccc{enter}")
        confirmEntryPresenceByIndex([0, 1, 2], [])
        cy.contains(".entry-idx-0-content", "aaa")
        cy.contains(".entry-idx-1-content", "bbb")
        cy.contains(".entry-idx-2-content", "ccc")
        delEntryByIndex(1)
        confirmEntryPresenceByIndex([0, 1], [2])
        cy.contains(".entry-idx-0-content", "aaa")
        cy.get("#entries").should("not.contain", "bbb")
        cy.contains(".entry-idx-1-content", "ccc")
        delEntryByIndex(1)
        confirmEntryPresenceByIndex([0], [1, 2])
        cy.contains(".entry-idx-0-content", "aaa")
        cy.get("#entries").should("not.contain", "bbb")
        cy.get("#entries").should("not.contain", "ccc")
        cy.get("#content").type("ccc{enter}")
        delEntryByIndex(0)
        confirmEntryPresenceByIndex([0], [1, 2])
        cy.get("#entries").should("not.contain", "aaa")
        cy.get("#entries").should("not.contain", "bbb")
        cy.contains(".entry-idx-0-content", "ccc")
        delEntryByIndex(0)
        confirmEntryPresenceByIndex([], [0, 1, 2])
    })

    it("Saves & retains prefix and suffix", function () {
        cy.get("#prefix").type("aaa ")
        cy.get("#content").type("bbb")
        cy.get("#suffix").type(" ccc{enter}")
        cy.contains(".entry-idx-0-content", "aaa bbb ccc")
        cy.get("#prefix").contains("aaa ")
        cy.get("#suffix").contains(" ccc")
        delEntryByIndex(0)
        cy.get("#prefix").clear()
        cy.get("#suffix").clear()
        cy.get("#prefix").should("be.empty")
        cy.get("#suffix").should("be.empty")
    })

})
