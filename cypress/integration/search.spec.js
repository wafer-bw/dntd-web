import { preTest, confirmEntryPresenceByIndex, addTestEntries, goToJournal, addTestEntries } from "."

context("Search Tests", () => {

    before(() => {
        preTest("1")
        goToJournal("1", 0)
        addTestEntries()
    })

    it("Searches text & tags (AND, OR, EXCLUDE)", function () {
        // AND
        //  - text
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("purple")
        confirmEntryPresenceByIndex([1, 2, 3], [0, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" green")
        confirmEntryPresenceByIndex([1, 2], [0, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" yellow{enter}")
        confirmEntryPresenceByIndex([2], [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        //  - simple tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@cherry")
        confirmEntryPresenceByIndex([8, 9, 10], [0, 1, 2, 3, 4, 5, 6, 7, 11])
        cy.get("#searchQuery").type(" @banana")
        confirmEntryPresenceByIndex([8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 10, 11])
        cy.get("#searchQuery").type(" @apple")
        confirmEntryPresenceByIndex([8], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11])
        //  - key:value tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@animal:dog")
        confirmEntryPresenceByIndex([5, 6, 7], [0, 1, 2, 3, 4, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" @animal:emu")
        confirmEntryPresenceByIndex([6, 7], [0, 1, 2, 3, 4, 5, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" @animal:frog")
        confirmEntryPresenceByIndex([7], [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11])

        // OR
        //  - text
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("red brown")
        confirmEntryPresenceByIndex([0, 3], [1, 2, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" purple")
        confirmEntryPresenceByIndex([0, 1, 2, 3], [4, 5, 6, 7, 8, 9, 10, 11])
        //  - simple tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@apple @fig")
        confirmEntryPresenceByIndex([8, 11], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10])
        cy.get("#searchQuery").type(" @banana")
        confirmEntryPresenceByIndex([8, 9, 11], [0, 1, 2, 3, 4, 5, 6, 7, 10])
        //  - key:value tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@animal:ant @animal:frog")
        confirmEntryPresenceByIndex([4, 7], [0, 1, 2, 3, 5, 6, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" @animal:emu")
        confirmEntryPresenceByIndex([4, 6, 7], [0, 1, 2, 3, 5, 8, 9, 10, 11])

        // EXCLUDE
        //  - text
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("green -yellow")
        confirmEntryPresenceByIndex([0, 1], [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#searchQuery").type(" -purple")
        confirmEntryPresenceByIndex([0], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        //  - simple tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@dragonfruit -cherry")
        confirmEntryPresenceByIndex([11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        //  - key:value tags
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("@animal:emu -@animal:frog")
        confirmEntryPresenceByIndex([6], [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11])
        cy.get("#searchQuery").clear()
    })

    it("Clear's search query via clear button", function () {
        cy.get("#searchQuery").clear()
        cy.get("#searchQuery").type("red")
        cy.contains("#searchQuery", "red")
        confirmEntryPresenceByIndex([0], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#clearSearch").click()
        cy.get("#searchQuery").should("not.contain", "red")
        confirmEntryPresenceByIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
    })

    it("Ctrl clicks tag values to apply search", function () {
        cy.get("body").type("{ctrl}", { release: false })
        cy.get(".entry-idx-5-content > span:nth-child(2)").click()
        cy.contains("#searchQuery", "@animal")
        cy.contains("#searchQuery", ":bear")
        confirmEntryPresenceByIndex([4, 5], [0, 1, 2, 3, 6, 7, 8, 9, 10, 11])
        cy.get(".entry-idx-5-content > span:nth-child(2)").click()
        cy.get("#searchQuery").should("not.contain", "@animal")
        cy.get("#searchQuery").should("not.contain", ":bear")
        confirmEntryPresenceByIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
        cy.get("body").type("{ctrl}")
    })

    it("Cmd clicks tag values to apply search", function () {
        cy.get("body").type("{cmd}", { release: false })
        cy.get(".entry-idx-5-content > span:nth-child(2)").click()
        cy.contains("#searchQuery", "@animal")
        cy.contains("#searchQuery", ":bear")
        confirmEntryPresenceByIndex([4, 5], [0, 1, 2, 3, 6, 7, 8, 9, 10, 11])
        cy.get(".entry-idx-5-content > span:nth-child(2)").click()
        cy.get("#searchQuery").should("not.contain", "@animal")
        cy.get("#searchQuery").should("not.contain", ":bear")
        confirmEntryPresenceByIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
        cy.get("body").type("{cmd}")
    })

    it("Normal clicks tag values does not apply search", function () {
        cy.get(".entry-idx-5-content > span:nth-child(2)").click()
        cy.get("#searchQuery").should("not.contain", "@animal")
        confirmEntryPresenceByIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
    })

})
