const url = Cypress.config("url")

import { preTest, postTest, delEntry } from "."

context("Nav Tests", () => {

    beforeEach(() => {
        preTest(`${url}?test=1`)
    })

    afterEach(() => {
        postTest()
    })

    it("Switches spreadsheets", function () {
        cy.get("#content").type("aaa{enter}")
        cy.get("#spreadsheetSelect").select("2222222222")
        cy.get("#entry-0").should("not.exist")
        cy.get("#spreadsheetSelect").select("1111111111")
        cy.contains("#entry-0-content", "aaa")
        delEntry(0)
    })

    it("Switches sheets", function () {
        cy.get("#content").type("aaa{enter}")
        cy.get("#sheetSelect").select("1")
        cy.get("#entry-0").should("not.exist")
        cy.get("#addSpreadsheet").click()
        cy.get("#spreadsheetURLs").type("https://docs.google.com/spreadsheets/d/1111111111\n")
        cy.get("#spreadsheetURLs").type("https://docs.google.com/spreadsheets/d/2222222222")
        cy.get("#addSpreadsheet").click()
        cy.get("#entry-0").should("not.exist")
        cy.get("#sheetSelect").select("0")
        cy.contains("#entry-0-content", "aaa")
        delEntry(0)
    })

})
