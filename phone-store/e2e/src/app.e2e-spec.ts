import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Phone store home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('top bar', () => {
    it('should exist', () => {
      page.navigateTo();
      expect(page.topBar.isPresent()).toBeTruthy();
    });

    it('should display the checkout button', () => {
      page.navigateTo();
      expect(page.checkoutButton.isPresent()).toBeTruthy();
    })

    describe('title', () => {
      it('should exist', () => {
        page.navigateTo();
        expect(page.pageTitle.isPresent()).toBeTruthy();
      });

      // This is kind of pointless by itself, but since it has been
      // built to fail and then pass when fixed, we gain at least
      // some confidence. It would be good to revise this test to
      // start from another page in the app when we have one so
      // we can see that it navigates back here to "home".
      it('should link to "/"', () => {
        page.navigateTo();
        page.pageTitle.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
      });
    });
  });

  describe('product list', () => {
    it('should exist', () => {
      page.navigateTo();
      expect(page.productList.isPresent()).toBeTruthy();
    });

    it('should have a header', () => {
      page.navigateTo();
      expect(page.productListHeader.isPresent()).toBeTruthy();
    });

    it('should have three products', () => {
      page.navigateTo();
      let products = page.products;
      expect(products.count()).toBe(3);
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
