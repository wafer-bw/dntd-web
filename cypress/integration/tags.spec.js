const url = Cypress.config("url")

import { preTest, postTest, delEntry } from "."

context("Tags Tests", () => {

    beforeEach(() => {
        preTest(`${url}?test=1`)
    })

    afterEach(() => {
        postTest()
    })

    it("Renders simple tags & refines", function () {
        cy.get("#content").type("a @simple tag{enter}")
        cy.contains("#entry-0-content", "a @simple tag")
        cy.contains("#entry-0-content > span", "@simple")
        cy.get("#tags > div:nth-child(2)").click()
        cy.contains("#tags > div.tagRefineWrap > div > span", "@simple")
        cy.get("#tags > div:nth-child(2)").click()
        delEntry(0)
        cy.get("#content").type("two of the same tag: @value @value{enter}")
        cy.contains("#entry-0-content", "@value @value")
        delEntry(0)
    })
    
    it("Renders complex tags & refines", function () {
        cy.get("#content").type("a @key:value tag{enter}")
        cy.contains("#entry-0-content", "a @key:value tag")
        cy.contains("#entry-0-content > span.tagKey", "@key")
        cy.contains("#entry-0-content > span.tagVal", ":val")
        cy.contains("#tags > div.tagRefineWrap > span > span:nth-child(3)", "@key:")
        cy.get("#tags > div:nth-child(3)").click()
        cy.contains("#tags > div.tagRefineWrap > div > span > span:nth-child(2)", "val")
        delEntry(0)
    })

    it("Handles \"'s\" tags", function () {
        cy.get("#content").type("@character's{enter}")
        cy.get("#content").type("@pc:Bob's{enter}")
        cy.contains("#entry-0-content > span.simpleTag", "@character's")
        cy.contains("#entry-1-content > span.tagKey", "@pc")
        cy.contains("#entry-1-content > span.tagVal", ":Bob's")
    })

})
