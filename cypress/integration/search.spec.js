const url = Cypress.config("url")

import { preTest, postTest, confirmEntryPresence } from "."

context("Search Tests", () => {

    beforeEach(() => {
        preTest(`${url}?test=1`)
        cy.get("#content").type("red blue green{enter}")                            // 0
        cy.get("#content").type("blue green purple{enter}")                         // 1
        cy.get("#content").type("green purple yellow{enter}")                       // 2
        cy.get("#content").type("purple yellow brown{enter}")                       // 3
        cy.get("#content").type("@animal:ant @animal:bear @animal:cat{enter}")      // 4
        cy.get("#content").type("@animal:bear @animal:cat @animal:dog{enter}")      // 5
        cy.get("#content").type("@animal:cat @animal:dog @animal:emu{enter}")       // 6
        cy.get("#content").type("@animal:dog @animal:emu @animal:frog{enter}")      // 7
        cy.get("#content").type("@apple @banana @cherry{enter}")                    // 8
        cy.get("#content").type("@banana @cherry @dragonfruit{enter}")              // 9
        cy.get("#content").type("@cherry @dragonfruit @elderberry{enter}")          // 10
        cy.get("#content").type("@dragonfruit @elderberry @fig{enter}")             // 11
    })

    afterEach(() => {
        postTest()
    })

    it("Searches text & tags (AND, OR, EXCLUDE)", function () {
        // AND
        //  - text
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("purple")
        confirmEntryPresence([1, 2, 3], [0, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" green")
        confirmEntryPresence([1, 2], [0, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" yellow{enter}")
        confirmEntryPresence([2], [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        //  - simple tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@cherry")
        confirmEntryPresence([8, 9, 10], [0, 1, 2, 3, 4, 5, 6, 7, 11])
        cy.get("#searchQuery").type(" @banana")
        confirmEntryPresence([8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 10, 11])
        cy.get("#searchQuery").type(" @apple")
        confirmEntryPresence([8], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11])
        //  - key:value tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@animal:dog")
        confirmEntryPresence([5, 6, 7], [0, 1, 2, 3, 4, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" @animal:emu")
        confirmEntryPresence([6, 7], [0, 1, 2, 3, 4, 5, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" @animal:frog")
        confirmEntryPresence([7], [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11])

        // OR
        //  - text
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("red brown")
        confirmEntryPresence([0, 3], [1, 2, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" purple")
        confirmEntryPresence([0, 1, 2, 3], [4, 5, 6, 7, 8, 9, 10, 11])
        //  - simple tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@apple @fig")
        confirmEntryPresence([8, 11], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10])
        cy.get("#searchQuery").type(" @banana")
        confirmEntryPresence([8, 9, 11], [0, 1, 2, 3, 4, 5, 6, 7, 10])
        //  - key:value tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@animal:ant @animal:frog")
        confirmEntryPresence([4, 7], [0, 1, 2, 3, 5, 6, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" @animal:emu")
        confirmEntryPresence([4, 6, 7], [0, 1, 2, 3, 5, 8, 9, 10, 11])

        // EXCLUDE
        //  - text
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("green -yellow")
        confirmEntryPresence([0, 1], [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" -purple")
        confirmEntryPresence([0], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        //  - simple tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@dragonfruit -cherry")
        confirmEntryPresence([11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        //  - key:value tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@animal:emu -@animal:frog")
        confirmEntryPresence([6], [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11])
        cy.get("#searchQuery").clear()
    })

    it("Clear's search query via clear button", function () {
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("red")
        cy.contains("#searchQuery", "red")
        confirmEntryPresence([0], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#clearSearch").click()
        cy.get("#searchQuery").should("not.contain", "red")
        confirmEntryPresence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
    })

    it("Ctrl clicks tag values to apply search", function () {
        cy.get("body").type("{ctrl}", { release: false })
        cy.get("#entry-5-content > span:nth-child(2)").click()
        cy.contains("#searchQuery", "@animal")
        cy.contains("#searchQuery", ":bear")
        confirmEntryPresence([4, 5], [0, 1, 2, 3, 6, 7, 8, 9, 10, 11])
        cy.get("#entry-5-content > span:nth-child(2)").click()
        cy.get("#searchQuery").should("not.contain", "@animal")
        cy.get("#searchQuery").should("not.contain", ":bear")
        confirmEntryPresence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
        cy.get("body").type("{ctrl}")
    })

    it("Cmd clicks tag values to apply search", function () {
        cy.get("body").type("{cmd}", { release: false })
        cy.get("#entry-5-content > span:nth-child(2)").click()
        cy.contains("#searchQuery", "@animal")
        cy.contains("#searchQuery", ":bear")
        confirmEntryPresence([4, 5], [0, 1, 2, 3, 6, 7, 8, 9, 10, 11])
        cy.get("#entry-5-content > span:nth-child(2)").click()
        cy.get("#searchQuery").should("not.contain", "@animal")
        cy.get("#searchQuery").should("not.contain", ":bear")
        confirmEntryPresence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
        cy.get("body").type("{cmd}")
    })

    it("Normal clicks tag values does not apply search", function () {
        cy.get("#entry-5-content > span:nth-child(2)").click()
        cy.get("#searchQuery").should("not.contain", "@animal")
        confirmEntryPresence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
    })

})
