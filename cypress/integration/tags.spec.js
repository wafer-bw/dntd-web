import { preTest, delEntryByIndex, goToJournal } from "."

context("Tags Tests", () => {

    before(() => {
        preTest("1")
        goToJournal("1", 0)
    })

    it("Renders simple tags & refines", function () {
        cy.get("#content").type("a @simple tag{enter}")
        cy.contains(".entry-idx-0-content", "a @simple tag")
        cy.contains(".entry-idx-0-content > span", "@simple")
        cy.get("#tags > div:nth-child(2)").click()
        cy.contains("#tags > div.tagRefineWrap > div > span", "@simple")
        cy.get("#tags > div:nth-child(2)").click()
        delEntryByIndex(0)
        cy.get("#content").type("two of the same tag: @value @value{enter}")
        cy.contains(".entry-idx-0-content", "@value @value")
        delEntryByIndex(0)
    })
    
    it("Renders complex tags & refines", function () {
        cy.get("#content").type("a @key:value tag{enter}")
        cy.contains(".entry-idx-0-content", "a @key:value tag")
        cy.contains(".entry-idx-0-content > span.tagKey", "@key")
        cy.contains(".entry-idx-0-content > span.tagVal", ":val")
        cy.contains("#tags > div:nth-child(2) > span > span:nth-child(3)", "@key:")
        cy.get("#tags > div:nth-child(2)").click()
        cy.contains("#tags > div:nth-child(2) > div > span > span:nth-child(2)", "val")
        delEntryByIndex(0)
    })

    it("Handles \"'s\" tags", function () {
        cy.get("#content").type("@character's{enter}")
        cy.get("#content").type("@pc:Bob's{enter}")
        cy.contains(".entry-idx-0-content > span.simpleTag", "@character's")
        cy.contains(".entry-idx-1-content > span.tagKey", "@pc")
        cy.contains(".entry-idx-1-content > span.tagVal", ":Bob's")
    })

})
