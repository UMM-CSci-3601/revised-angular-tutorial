/// <reference types="cypress" />

import { toInteger } from "cypress/types/lodash"

describe('Phone store home page', () => {

  beforeEach(() => {
    cy.viewport(400, 600)
    cy.visit('http://localhost:4200/')
  })

  it('should have a project title of "PhoneStore"', () => {
    // this test was not in our older Protractor tests
    cy.title().should('be', 'PhoneStore')
  })

  describe('top bar', () => {
    it('should exist', () => {
      cy.get<HTMLElement>('app-top-bar').should('exist')
    })

    it('should display the checkout button', () => {
      cy.get<HTMLElement>('.button')
        .should('exist')
        .and('be.visible')
    })

    describe('title', () => {
      it('should exist', () => {
        cy.get<HTMLElement>('a h1').should('exist')
      })

      it('should display the name of my store, which needs to include "store"', () => {
        cy.get<HTMLElement>('a h1').contains('store', { matchCase: false})
      })

      it('should link to "/"', () => {
        cy.get<HTMLElement>('a h1').click()
        cy.url().should('eq', 'http://localhost:4200/')
      })
    })
  })

  describe('product list', () => {
    it('should exist', () => {
      cy.get<HTMLElement>('app-product-list').should('exist')
    })

    it('should have a header', () => {
      cy.get<HTMLElement>('app-product-list h2').should('exist')
    })

    it('should have three products', () => {
      cy.get<HTMLElement>('.product-entry').should('have.length', 3)
    })

    it('should have each product be a link', () => {
      cy.get<HTMLElement>('.product-entry a').should('exist')
    })

    it('should have "details" as part of the title of each link', () => {
      cy.get<HTMLElement>('.product-entry a')
        .should(($productEntries) => {
          for (var _i=0; _i<$productEntries.length; _i++) {
            //console.log($productEntries.get(_i).getAttribute('title'))
            expect($productEntries.get(_i).getAttribute('title')).to.contain('details')
          }
        })
    })
  })
})
