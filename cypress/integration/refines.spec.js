const url = Cypress.config("url")

import { preTest, postTest, confirmEntryPresence } from "."

context("Refines Tests", () => {

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

    it("Refines", function () {
        // Simple tags
        cy.get("#tags > div:nth-child(2) > span").click()
        cy.get("#tags > div:nth-child(2) > div:nth-child(3)").click()
        cy.get("#tags > div:nth-child(2) > div:nth-child(4)").click()
        confirmEntryPresence([10, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8])
        cy.get("#tags > div:nth-child(2) > div:nth-child(5)").click()
        confirmEntryPresence([10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11])
        cy.get("#tags > div:nth-child(2) > div:nth-child(5)").click()
        cy.get("#tags > div:nth-child(2) > div:nth-child(4)").click()
        cy.get("#tags > div:nth-child(2) > div:nth-child(3)").click()
        cy.get("#tags > div:nth-child(2) > span").click()
        // Key:value tags
        cy.get("#tags > div:nth-child(3) > span").click()
        cy.get("#tags > div:nth-child(3) > div:nth-child(2)").click()
        confirmEntryPresence([7], [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11])
        cy.get("#tags > div:nth-child(3) > div:nth-child(2)").click()
        cy.get("#tags > div:nth-child(3) > div:nth-child(4)").click()
        cy.get("#tags > div:nth-child(3) > div:nth-child(7)").click()
        confirmEntryPresence([4, 5, 6, 7], [0, 1, 2, 3, 8, 9, 10, 11])
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
    })

    it("Ctrl clicks refine tag keys to apply refines", function () {
        cy.get("body").type("{ctrl}", { release: false })
        cy.get("#tags > div:nth-child(3)").click()
        confirmEntryPresence([4, 5, 6, 7], [0, 1, 2, 3, 8, 9, 10, 11])
        cy.get("#tags > div:nth-child(3)").click()
        confirmEntryPresence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
        cy.get("body").type("{ctrl}")
    })

    it("Cmd clicks refine tag keys to apply refines", function () {
        cy.get("body").type("{cmd}", { release: false })
        cy.get("#tags > div:nth-child(3)").click()
        confirmEntryPresence([4, 5, 6, 7], [0, 1, 2, 3, 8, 9, 10, 11])
        cy.get("#tags > div:nth-child(3)").click()
        confirmEntryPresence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
        cy.get("body").type("{cmd}")
    })

    it("Properly clears simple tag keys from refine query if they don't exist", function() {
        cy.get("#content").type("@simpletagdeletetest{enter}")
        cy.get("#tags > div:nth-child(2) > span").click()
        cy.get("#tags > div:nth-child(2) > div:nth-child(2)").click()
        confirmEntryPresence([12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#entry-12 > button").click()
        confirmEntryPresence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
    })

    it("Properly clears complex tag keys from refine query if they don't exist", function() {
        cy.get("#content").type("@complextagkey:deletetest{enter}")
        cy.get("body").type("{ctrl}", { release: false })
        cy.get("#tags > div:nth-child(4)").click()
        cy.get("body").type("{ctrl}")
        confirmEntryPresence([12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#entry-12 > button").click()
        confirmEntryPresence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
    })

    it("Properly clears complex tag vals from refine query if they don't exist", function() {
        cy.get("#content").type("@complextagkey:deletetest{enter}")
        cy.get("#tags > div:nth-child(4)").click()
        cy.get("#tags > div:nth-child(4) > div").click()
        confirmEntryPresence([12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        cy.get("#entry-12 > button").click()
        confirmEntryPresence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])
    })

})