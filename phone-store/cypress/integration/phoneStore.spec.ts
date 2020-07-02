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
        page.topBarTitle().contains('store', { matchCase: false })
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

    it('should have each product be a link (custom)', () => {
      page.productListEntries().shouldEachHave('a')
    })

    it('should have "details" as part of the title of each link (no page objects)', () => {
      /*
       * This asserts that there are three:
       *   - product entries
       *   - that have an `a` tag
       *   - that contain titles
       * Since there are only three product entries this implicitly
       * asserts that _all_ product entries have `a` tags that
       * contain titles.
       */
      cy.get('.product-entry > h3 > a[title]').should('have.length', 3);
      /*
       * This asserts that every
       *  - title
       *  - inside an `a` tag
       *  - inside a product entry
       * ends with the string " details". Note that this does
       * _not_ require that, e.g., product entries _have_ these
       * elements, just that if they do they need to match this
       * pattern.
       *
       */
      cy.get('.product-entry > h3 > a[title]').attribute('title').each((title) => {
        expect(title).to.match(/.* details/);
      });
    });

    /*
     * This checks that each product entry in fact has a link with a title, and that
     * title should end in "details".
     *
     * The `find` command will also return `undefined` if there's not a link with
     * a title in the `productEntry`. This means this test will fail if any individual
     * product entry fails to have the desired structure, which is nice. The
     * previous test does not do that, which is why we have the `length` test
     * there to make sure they all have the desired structure.
     */
    it('should have "details" as part of the title of each link (no page objects, each product-entry)', () => {
      cy.get('.product-entry').each((productEntry) => {
        expect(productEntry.find('h3 > a[title]').attr('title')).to.match(/.* details/);
      });
    });

    it('should have "details" as part of the title of each link (ugly) given links', () => {
      page.productListEntryLinks()
        .should(($productEntries) => {
          for (var _i = 0; _i < $productEntries.length; _i++) {
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

    it('should have "details" as part of the title of each link (each, chai) given entries', () => {
      page.productListEntries()
        .each(($entry) => {
          expect($entry.find('a').attr('title')).to.match(/.* details$/);
        })
    })

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
