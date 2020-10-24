import { goToJournal, preTest } from "."
import { syncRate } from "../../src/workers/sync"

context("Failure Tests", () => {

    it("Fails properly when it can't load spreadsheet sheets", function () {
        preTest("2")
        cy.wait(syncRate + 25)
        cy.get("#errors").should("exist")
        cy.get("#errors > div:nth-child(1) > button").click()
        cy.get("#errors > div:nth-child(1) > button").click()
        cy.get("#errors").should("not.exist")
    })

    it("Fails properly when it can't get a range", function () {
        preTest("3")
        cy.wait(syncRate + 25)
        goToJournal("1", 0)
        cy.contains("Syncing is paused")
        cy.get("#errors").should("exist")
        cy.get("#errors > div:nth-child(1) > button").click()
        cy.get("#errors").should("not.exist")
    })

    it("Fails properly when it can't update a range", function () {
        preTest("4")
        goToJournal("1", 0)
        cy.get("#content").type("hello{enter}")
        cy.wait(syncRate + 25)
        cy.contains("Syncing is paused")
        cy.get("#errors").should("exist")
        cy.get("#errors > div > button").click()
        cy.get("#errors").should("not.exist")
    })

    it("Fails properly when it can't delete a range", function () {
        preTest("5")
        goToJournal("1", 0)
        cy.get("#content").type("hello{enter}")
        cy.get(".del-entry-idx-0").click()
        cy.wait(syncRate + 25)
        cy.contains("Syncing is paused")
        cy.get("#errors").should("exist")
        cy.get("#errors > div:nth-child(1) > button").click()
        cy.get("#errors").should("not.exist")
    })

    it("Unpauses syncing after syncer error", function () {
        preTest("5")
        goToJournal("1", 0)
        cy.get("#content").type("hello{enter}")
        cy.get(".del-entry-idx-0").click()
        cy.wait(syncRate + 25)
        cy.contains("Syncing is paused")
        cy.get("#errors").should("exist")
        cy.get("#errors > div:nth-child(1) > button").click()
        cy.get("#errors").should("not.exist")
        cy.get("#unpauseSync").click()
        cy.contains("Syncing is paused")
        cy.get("#errors").should("exist")
    })

})
