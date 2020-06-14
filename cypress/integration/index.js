export const data = {
    "spreadsheetUrls": [
        "https://docs.google.com/spreadsheets/d/1111111111",
        "https://docs.google.com/spreadsheets/d/2222222222"
    ],
    "requiredElementIds": [
        "#sheetSelect",
        "#searchQuery",
        "#spreadsheetSelect",
        "#hideEntriesKeysToggle",
        "#hideTagRefinesToggle",
        "#tags",
        "#search",
        "#prefix",
        "#content",
        "#suffix"
    ]
}

export function preTest(url) {
    cy.visit(`${url}`)
    cy.contains("dntd")
    cy.get("#addSpreadsheet").click()
    for (let spreadsheetUrl of data.spreadsheetUrls) {
        cy.get("#spreadsheetURLs").type(`${spreadsheetUrl}{enter}`)
    }
    cy.get("#addSpreadsheet").click()
    for (let elementId of data.requiredElementIds) {
        cy.get(elementId).should("exist")
    }
}

export function postTest() {
    cy.get("#addSpreadsheet").click()
    cy.get("#spreadsheetURLs").clear()
    cy.get("#addSpreadsheet").click()
    cy.get("#sheetSelect").should("not.exist")
    cy.get("#spreadsheetSelect").should("not.exist")
}

export function delEntry(idx) {
    cy.get(`#entry-${idx} > button.del`).click()
}

export function confirmEntryPresence(exist, notExist) {
    for (let e of exist) {
        cy.get(`#entry-${e}`).should("exist")
    }
    for (let n of notExist) {
        cy.get(`#entry-${n}`).should("not.exist")
    }
}
