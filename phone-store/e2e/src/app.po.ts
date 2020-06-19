import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  private get topBar() : ElementFinder {
    return element(by.css('app-top-bar'));
  }

  get titleText(): Promise<string> {
    let title = this.topBar.element(by.css('h1')).getText() as Promise<string>;
    return title;
  }

  get checkoutButton() : ElementFinder{
    return element(by.className('button'))
  }
}
