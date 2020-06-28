/// <reference types="cypress" />

export class PhoneStoreHomePage {
  navigate() {
    return cy.visit('http://localhost:4200/')
  }

  topBar() {
    return cy.get<HTMLElement>('app-top-bar')
  }

  topBarTitle() {
    return cy.get<HTMLElement>('app-top-bar a h1')
  }

  checkoutButton() {
    return cy.get<HTMLButtonElement>('app-top-bar .button')
  }

  productList() {
    return cy.get<HTMLElement>('app-product-list')
  }

  productListHeader() {
    return cy.get<HTMLElement>('app-product-list h2')
  }

  productListEntries() {
    return cy.get<HTMLElement>('.product-entry')
  }

  productListEntryLinks() {
    return cy.get<HTMLLinkElement>('.product-entry a')
  }
}
