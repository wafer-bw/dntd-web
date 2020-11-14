const url = Cypress.config("url")

import { postTest } from "."
import { syncRate } from "../../src/workers/sync"

context("Failure Tests", () => {

    afterEach(() => {
        postTest()
    })

    it("Fails properly when it can't load spreadsheet sheets", function () {
        cy.visit(`${url}?test=2`)
        cy.get("#addSpreadsheet").click()
        cy.get("#spreadsheetURLs").type("https://docs.google.com/spreadsheets/d/1111111111/\n")
        cy.get("#addSpreadsheet").click()
        cy.wait(syncRate + 25)
        cy.contains("Sync Error")
        cy.get("#errors").should("exist")
        cy.get("#errors > div > button").click()
        cy.get("#errors").should("not.exist")
    })

    it("Fails properly when it can't get a range", function () {
        cy.visit(`${url}?test=3`)
        cy.get("#addSpreadsheet").click()
        cy.get("#spreadsheetURLs").type("https://docs.google.com/spreadsheets/d/1111111111/\n")
        cy.get("#addSpreadsheet").click()
        cy.wait(syncRate + 25)
        cy.contains("Sync Error")
        cy.get("#errors").should("exist")
        cy.get("#errors > div:nth-child(1) > button").click()
        cy.get("#errors").should("not.exist")
    })

    it("Fails properly when it can't update a range", function () {
        cy.visit(`${url}?test=4`)
        cy.get("#addSpreadsheet").click()
        cy.get("#spreadsheetURLs").type("https://docs.google.com/spreadsheets/d/1111111111/\n")
        cy.get("#addSpreadsheet").click()
        cy.get("#content").type("hello{enter}")
        cy.wait(syncRate + 25)
        cy.contains("Sync Error")
        cy.get("#errors").should("exist")
        cy.get("#errors > div > button").click()
        cy.get("#errors").should("not.exist")
    })

    it("Fails properly when it can't delete a range", function () {
        cy.visit(`${url}?test=5`)
        cy.get("#addSpreadsheet").click()
        cy.get("#spreadsheetURLs").type("https://docs.google.com/spreadsheets/d/1111111111/\n")
        cy.get("#addSpreadsheet").click()
        cy.get("#content").type("hello{enter}")
        cy.get("#entry-0 > button").click()
        cy.wait(syncRate + 25)
        cy.contains("Sync Error")
        cy.get("#errors").should("exist")
        cy.get("#errors > div > button").click()
        cy.get("#errors").should("not.exist")
    })

    it("Unpauses syncing after syncer error", function () {
        cy.visit(`${url}?test=5`)
        cy.get("#addSpreadsheet").click()
        cy.get("#spreadsheetURLs").type("https://docs.google.com/spreadsheets/d/1111111111/\n")
        cy.get("#addSpreadsheet").click()
        cy.get("#content").type("hello{enter}")
        cy.get("#entry-0 > button").click()
        cy.wait(syncRate + 25)
        cy.contains("Sync Error")
        cy.get("#errors").should("exist")
        cy.get("#errors > div > button").click()
        cy.get("#errors").should("not.exist")
        cy.get("#unpauseSync").click()
        cy.contains("Sync Error")
        cy.get("#errors").should("exist")
    })

})
