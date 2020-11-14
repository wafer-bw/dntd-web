const url = Cypress.config("url")

import { preTest, data } from "."

context("Load and Unload Tests", () => {

    beforeEach(() => {
        preTest(`${url}?test=6`)
    })

    it("Loads data", function () {
        // data comes from ./src/mocks/syncTasks.ts/SyncTaskMocks/getRows()
        // - ["aaa", "bbb", "ccc", "@tag", "@key:value"]
        cy.contains("#entry-0", "aaa")
        cy.contains("#entry-1", "bbb")
        cy.contains("#entry-2", "ccc")
        cy.contains("#entry-3", "@tag")
        cy.contains("#entry-4", "@key:value")
    })

    it("Unloads journal", function () {
        cy.get(".authButton").click()
        for (let elementId of data.requiredElementIds) {
            cy.get(elementId).should("not.exist")
        }
    })

})
