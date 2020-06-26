import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

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

  get checkoutButton() : ElementFinder {
    return element(by.className('button'));
  }

  get productList() : ElementFinder {
    return element(by.css('app-product-list'));
  }

  get productListHeader() : ElementFinder {
    return this.productList.element(by.css('h2'));
  }

  get products() : ElementArrayFinder {
    return this.productList.all(by.css('h3'));
  }

  get productLinks() : ElementArrayFinder {
    return this.products.all(by.css('a'));
  }
}

export function getLink(pageElement : ElementFinder | undefined) : ElementFinder {
  if (pageElement === undefined) {
    throw new TypeError("page element should not be undefined");
  }
  return pageElement.element(by.css('a'));
}
