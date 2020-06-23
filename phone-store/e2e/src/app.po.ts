import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  get topBar() : ElementFinder {
    return element(by.css('app-top-bar'));
  }

  get pageTitle() : ElementFinder {
    return this.topBar.element(by.css('a h1'));
  }

  get checkoutButton() : ElementFinder{
    return element(by.className('button'));
  }
}
