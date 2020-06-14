const url = Cypress.config("url")

import { preTest, postTest, confirmEntryPresence, delEntry } from "."

context("Entries Tests", () => {

    beforeEach(() => {
        preTest(`${url}?test=1`)
    })

    afterEach(() => {
        postTest()
    })

    it("Creates, updates, and deletes entries", function () {
        // Create
        cy.get("#content").type("hello world{enter}")
        cy.contains("#entry-0-content", "hello world")
        // Update
        cy.get("#entry-0-content").type("!{enter}")
        cy.contains("#entry-0-content", "hello world!")
        // Delete
        delEntry(0)
        cy.get("#entry-0").should("not.exist")
    })

    it("Deletes correct entries", function () {
        cy.get("#content").type("aaa{enter}")
        cy.get("#content").type("bbb{enter}")
        cy.get("#content").type("ccc{enter}")
        confirmEntryPresence([0, 1, 2], [])
        cy.contains("#entry-0", "aaa")
        cy.contains("#entry-1", "bbb")
        cy.contains("#entry-2", "ccc")
        delEntry(1)
        confirmEntryPresence([0, 1], [2])
        cy.contains("#entry-0", "aaa")
        cy.get("#entries").should("not.contain", "bbb")
        cy.contains("#entry-1", "ccc")
        delEntry(1)
        confirmEntryPresence([0], [1, 2])
        cy.contains("#entry-0", "aaa")
        cy.get("#entries").should("not.contain", "bbb")
        cy.get("#entries").should("not.contain", "ccc")
        cy.get("#content").type("ccc{enter}")
        delEntry(0)
        confirmEntryPresence([0], [1, 2])
        cy.get("#entries").should("not.contain", "aaa")
        cy.get("#entries").should("not.contain", "bbb")
        cy.contains("#entry-0", "ccc")
        delEntry(0)
        confirmEntryPresence([], [0, 1, 2])
    })

    it("Saves & retains prefix and suffix", function () {
        cy.get("#prefix").type("aaa ")
        cy.get("#content").type("bbb")
        cy.get("#suffix").type(" ccc{enter}")
        cy.contains("#entry-0", "aaa bbb ccc")
        cy.get("#prefix").contains("aaa ")
        cy.get("#suffix").contains(" ccc")
        delEntry(0)
        cy.get("#prefix").clear()
        cy.get("#suffix").clear()
        cy.get("#prefix").should("be.empty")
        cy.get("#suffix").should("be.empty")
    })

})
