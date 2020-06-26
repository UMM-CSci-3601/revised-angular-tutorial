/// <reference types="cypress" />

describe('Phone store home page', () => {

  context('Viewport', () => {
    beforeEach(() => {
      cy.viewport(400, 800)
      cy.visit('http://localhost:4200/')
    })

    it('cy.title() - get the title', () => {
      // https://on.cypress.io/title
      cy.title().should('include', 'PhoneStore')
    })

    it('should display the name of my store, which needs to include "store"', () => {
      cy.get('h1').contains('store', { matchCase: false})
    })

    describe('product list', () => {
      it('should have 3 products', () => {
        cy.get('.product-entry').should('have.length', 3)
      })

      it('should have each product be a link', () => {
        cy.get('.product-entry a').should('exist')
      })

      it('should have details as part of each link', () => {
        cy.get('.product-entry a')
          .should(($productEntries) => {
            for (i=0; i<$productEntries.length; i++) {
              console.log($productEntries.get(i).getAttribute('title'))
              expect($productEntries.get(i).getAttribute('title')).to.contain('details')
            }
          })
      })
    })
  })
})
