import { preTest, confirmEntryPresenceByIndex, addTestEntries, goToJournal, addTestEntries } from "."

context("Refines Tests", () => {

    before(() => {
        preTest("1")
        goToJournal("1", 0)
        addTestEntries()
    })

    it("Refines", function () {
        // Simple tags
        cy.get("#tags > div:nth-child(2) > span").click()
        cy.get("#tags > div:nth-child(2) > div:nth-child(3)").click()
        cy.get("#tags > div:nth-child(2) > div:nth-child(4)").click()
        confirmEntryPresenceByIndex([10, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8])
        cy.get("#tags > div:nth-child(2) > div:nth-child(5)").click()
        confirmEntryPresenceByIndex([10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11])
        cy.get("#tags > div:nth-child(2) > div:nth-child(5)").click()
        cy.get("#tags > div:nth-child(2) > div:nth-child(4)").click()
        cy.get("#tags > div:nth-child(2) > div:nth-child(3)").click()
        cy.get("#tags > div:nth-child(2) > span").click()
        // Key:value tags
        cy.get("#tags > div:nth-child(3) > span").click()
        cy.get("#tags > div:nth-child(3) > div:nth-child(2)").click()
        confirmEntryPresenceByIndex([7], [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11])
        cy.get("#tags > div:nth-child(3) > div:nth-child(2)").click()
        cy.get("#tags > div:nth-child(3) > div:nth-child(4)").click()
        cy.get("#tags > div:nth-child(3) > div:nth-child(7)").click()
        confirmEntryPresenceByIndex([4, 5, 6, 7], [0, 1, 2, 3, 8, 9, 10, 11])
        cy.get("#tags > div:nth-child(3) > div:nth-child(4)").click()
        cy.get("#tags > div:nth-child(3) > div:nth-child(7)").click()
        cy.get("#tags > div:nth-child(3) > span").click()
    })

    it("Orders refines properly", function () {
        cy.get("#tags > div:nth-child(3) > span").click()
        cy.get("#tags > div:nth-child(3) > div:nth-child(2)").contains("frog")
        cy.get("#tags > div:nth-child(3) > div:nth-child(3)").contains("emu")
        cy.get("#tags > div:nth-child(3) > div:nth-child(4)").contains("dog")
        cy.get("#tags > div:nth-child(3) > div:nth-child(5)").contains("cat")
        cy.get("#tags > div:nth-child(3) > div:nth-child(6)").contains("bear")
        cy.get("#tags > div:nth-child(3) > div:nth-child(7)").contains("ant")
        cy.get("#tags > div:nth-child(3) > span").click()
    })

    it("Ctrl clicks refine tag keys to apply refines", function () {
        cy.get("body").type("{ctrl}", { release: false })
        cy.get("#tags > div:nth-child(3)").click()
        confirmEntryPresenceByIndex([4, 5, 6, 7], [0, 1, 2, 3, 8, 9, 10, 11])
        cy.get("#tags > div:nth-child(3)").click()
        confirmEntryPresenceByIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
        cy.get("body").type("{ctrl}")
    })

    it("Cmd clicks refine tag keys to apply refines", function () {
        cy.get("body").type("{cmd}", { release: false })
        cy.get("#tags > div:nth-child(3)").click()
        confirmEntryPresenceByIndex([4, 5, 6, 7], [0, 1, 2, 3, 8, 9, 10, 11])
        cy.get("#tags > div:nth-child(3)").click()
        confirmEntryPresenceByIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
        cy.get("body").type("{cmd}")
    })

    it("Properly clears simple tag keys from refine query if they don't exist", function() {
        cy.get("#content").type("@simpletagdeletetest{enter}")
        cy.get("#tags > div:nth-child(2) > span").click()
        cy.get("#tags > div:nth-child(2) > div:nth-child(2)").click()
        confirmEntryPresenceByIndex([12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get(".del-entry-idx-12").click()
        confirmEntryPresenceByIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
    })

    it("Properly clears complex tag keys from refine query if they don't exist", function() {
        cy.get("#content").type("@complextagkey:deletetest{enter}")
        cy.get("body").type("{ctrl}", { release: false })
        cy.get("#tags > div:nth-child(4)").click()
        cy.get("body").type("{ctrl}")
        confirmEntryPresenceByIndex([12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get(".del-entry-idx-12").click()
        confirmEntryPresenceByIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
    })

    it("Properly clears complex tag vals from refine query if they don't exist", function() {
        cy.get("#content").type("@complextagkey:deletetest{enter}")
        cy.get("#tags > div:nth-child(4)").click()
        cy.get("#tags > div:nth-child(4) > div").click()
        confirmEntryPresenceByIndex([12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get(".del-entry-idx-12").click()
        confirmEntryPresenceByIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
    })

})