const url = Cypress.config("url")

import { preTest, postTest } from "."

context("Toggles Tests", () => {

    beforeEach(() => {
        preTest(`${url}?test=1`)
    })

    afterEach(() => {
        postTest()
    })

    it("Hides tag refines pane", function () {
        cy.get("#tagsWrap").should("exist")
        cy.get("#hideTagRefinesToggle").click()
        cy.get("#tagsWrap").should("not.exist")
        cy.get("#hideTagRefinesToggle").click()
        cy.get("#tagsWrap").should("exist")
    })

    it("Hides tag keys", function () {
        cy.get("#content").type("@animal:ant @animal:bear @animal:cat{enter}")
        cy.get("#content").type("@animal:bear @animal:cat @animal:dog{enter}")
        cy.get("#content").type("@animal:cat @animal:dog @animal:emu{enter}")
        cy.get("#content").type("@animal:dog @animal:emu @animal:frog{enter}")

        cy.get("#entry-0-content > span.tagKey").should("exist")
        cy.get("#entry-1-content > span.tagKey").should("exist")
        cy.get("#entry-2-content > span.tagKey").should("exist")
        cy.get("#entry-3-content > span.tagKey").should("exist")
        cy.get("#hideEntriesKeysToggle").click()
        cy.get("#entry-0-content > span.tagKey").should("not.exist")
        cy.get("#entry-1-content > span.tagKey").should("not.exist")
        cy.get("#entry-2-content > span.tagKey").should("not.exist")
        cy.get("#entry-3-content > span.tagKey").should("not.exist")
        cy.get("#hideEntriesKeysToggle").click()
        cy.get("#entry-0-content > span.tagKey").should("exist")
        cy.get("#entry-1-content > span.tagKey").should("exist")
        cy.get("#entry-2-content > span.tagKey").should("exist")
        cy.get("#entry-3-content > span.tagKey").should("exist")
    })

})
