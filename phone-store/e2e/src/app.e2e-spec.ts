import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Phone store home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('store title', () => {
    it('should display the store title', () => {
      page.navigateTo();
      expect(page.titleText).toEqual('My Store');
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

  it('should display the checkout button', () => {
    page.navigateTo();
    expect(page.checkoutButton.isPresent()).toBeTruthy();
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
