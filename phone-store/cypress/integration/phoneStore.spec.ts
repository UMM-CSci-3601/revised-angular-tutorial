/// <reference types="cypress" />

import { PhoneStoreHomePage } from "../page-objects/phone-store-home-page.po"

describe('Phone store home page', () => {
  const page = new PhoneStoreHomePage

  beforeEach(() => {
    cy.viewport(400, 600)
    page.navigate()
  })

  it('should have a project title of "PhoneStore"', () => {
    // this test was not in our older Protractor tests
    cy.title().should('be', 'PhoneStore')
  })

  describe('top bar', () => {
    it('should exist', () => {
      page.topBar().should('exist')
    })

    it('should display the checkout button', () => {
      page.checkoutButton()
        .should('exist')
        .and('be.visible')
    })

    describe('title', () => {
      it('should exist', () => {
        page.topBarTitle().should('exist')
      })

      it('should display the name of my store, which needs to include "store"', () => {
        page.topBarTitle().contains('store', { matchCase: false})
      })

      it('should link to "/"', () => {
        page.topBar().click()
        cy.url().should('eq', page.home)
      })
    })
  })

  describe('product list', () => {
    it('should exist', () => {
      page.productList().should('exist')
    })

    it('should have a header', () => {
      page.productListHeader().should('exist')
    })

    it('should have three products', () => {
      page.productListEntries().should('have.length', 3)
    })

    it('should have each product be a link', () => {
      page.productListEntries().each(entry => {
        cy.wrap(entry).should('have', 'a')
      })
    })

    it('should have each product be a link (chai)', () => {
      page.productListEntries().each(entry => {
        expect(entry).to.have.descendants('a')
      })
    })

    it('should have each product be a link (custom)', () =>{
      page.productListEntries().shouldEachHave('a')
    })

    it('should have "details" as part of the title of each link (ugly) given links', () => {
      page.productListEntryLinks()
        .should(($productEntries) => {
          for (var _i=0; _i<$productEntries.length; _i++) {
            expect($productEntries.get(_i).getAttribute('title')).to.contain('details')
          }
        })
    })

    it('should have "details" as part of the title of each link (each, chai) given links', () => {
      page.productListEntryLinks().attribute('title')
        .each(($entry) => {
          expect($entry).to.match(/.* details$/)
        })
    })
/*
    it.only('should have "details" as part of the title of each link (each, chai) given entries', () => {
      page.productListEntries()
        .each(($entry) => {
          expect($entry.getAttribute('title')).to.match(/.* details$/)
        })
    })
*/
    it('should have "details" as part of the title of each link (each, cypress-wrapped) given links', () => {
      page.productListEntryLinks().attribute('title')
        .each(($entry) => {
          cy.wrap($entry).should('match', /.* details$/)
        })
    })

    it('should have "details" as part of the title of each link (each, cypress-wrapped, within) given entries', () => {
      page.productListEntries().each(($el) => {
        cy.wrap($el).within(() => {
          cy.get('a').attribute('title').should('match', /.* details$/)
        })
      })
    })

    it('should have "details" as part of the title of each link (each, cypress-wrapped, find) given entries', () => {
      page.productListEntries().each((el) => {
        cy.wrap(el).find('a').attribute('title').should('match', /.* details$/)
      })
    })

    it('should have "details" as part of the title of each link (each, cypress-wrapped) given links', () => {
      page.productListEntryLinks().each((el) => {
        cy.wrap(el).attribute('title').should('match', /.* details$/)
      })
    })

  })
})
