export const data = {
    "spreadsheetUrls": [
        "https://docs.google.com/spreadsheets/d/1",
        "https://docs.google.com/spreadsheets/d/2"
    ],
}

const url = Cypress.config("url")

export function preTest(mode) {
    cy.visit(`${url}/#/setTestMode/${mode}`)
    cy.contains("dntd")
    cy.get("#addShelvesButton").click()
    cy.get("#addShelvesText").type(data.spreadsheetUrls.join("{enter}"))
    cy.get("#addShelvesButton").click()
}

export function delEntryByID(id) {
    cy.get(`#del-entry-${id}`).click()
}

export function delEntriesByID(ids) {
    ids.forEach(id => {
       delEntryByID(id)
    })
}

export function delEntryByIndex(idx) {
    cy.get(`.del-entry-idx-${idx}`).click()
}

export function delEntriesByIndex(idxs) {
    idxs.forEach(idx => {
        delEntryByIndex(idx)
    })
}

export function confirmEntryPresenceByIndex(exist, notExist) {
    for (let e of exist) {
        cy.get(`.entry-idx-${e}`).should("exist")
    }
    for (let n of notExist) {
        cy.get(`.entry-idx-${n}`).should("not.exist")
    }
}

export function goToJournal(shelfId, journalId) {
    cy.get(`#shelf-${shelfId}`).click()
    cy.get(`#journal-${journalId}`).click()
}

export function addTestEntries() {
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
}
