import { AppPage, getLink } from './app.po';
import { browser, logging, ElementFinder } from 'protractor';

describe('Phone store home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  describe('top bar', () => {
    it('should exist', () => {
      expect(page.topBar.isPresent()).toBeTruthy();
    });

    it('should display the checkout button', () => {
      expect(page.checkoutButton.isPresent()).toBeTruthy();
    })

    describe('title', () => {
      it('should exist', () => {
        expect(page.pageTitle.isPresent()).toBeTruthy();
      });

      // This is kind of pointless by itself, but since it has been
      // built to fail and then pass when fixed, we gain at least
      // some confidence. It would be good to revise this test to
      // start from another page in the app when we have one so
      // we can see that it navigates back here to "home".
      it('should link to "/"', () => {
        page.pageTitle.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
      });
    });
  });

  describe('product list', () => {
    it('should exist', () => {
      expect(page.productList.isPresent()).toBeTruthy();
    });

    it('should have a header', () => {
      expect(page.productListHeader.isPresent()).toBeTruthy();
    });

    it('should have three products', () => {
      let products = page.products;
      expect(products.count()).toBe(3);
    });

    it('should have links for each product name', () => {
      let products = page.products;
      products.each(function(product : ElementFinder) {
        // This version uses the `getLink` function in the PO file.
        expect(getLink(product).isPresent).toBeTruthy();
        // This version directly extracts the 'a' element.
        // expect(product.element(by.css('a')).isPresent()).toBeTruthy();
      });
    });

    /*
     * The title of each link should be the name of the product followed
     * by ' details', e.g., 'Pixel 3 details'. We'll not worry about the
     * actual product names since we don't know what they might be, and
     * just check that the title ends in ' details'. This also confirms
     * that every product link actually _has_ a title.
     */
    it('should have correct title links for each product name', () => {
      let products = page.products;
      products.each(function(product : ElementFinder) {
        let link = getLink(product);
        let linkTitle = link.getAttribute('title');
        expect(linkTitle).toMatch(".* details$");
      });
    })
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
