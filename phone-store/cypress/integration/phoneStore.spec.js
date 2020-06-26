/// <reference types="cypress" />

context('Viewport', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('cy.title() - get the title', () => {
    // https://on.cypress.io/title
    cy.title().should('include', 'PhoneStore')
  })

  it('should have 3 products', () => {
    cy.get('.product-entry').should('have.length', 3)
  })

  it('should have each product be a link', () => {
    cy.get('.product-entry a').should('exist')
  })

  it('should have details as part of each link', () => {
    cy.get('product-entry a[title]').contains('details')
  })

})
