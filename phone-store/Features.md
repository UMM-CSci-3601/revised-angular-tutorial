# Features from the tutorial <!-- omit in toc -->

After working through a BDD approach to the start of the
tutorial, it seems that it might be helpful to go through
the tutorial and pull out an ordered list of features that we
would need to implement so we're not constantly digging through
the tutorial text to figure out where we are and what we need to
do next.

There are places where the tutorial doesn't structure the code or
sequence the addition of features in a way that makes a lot of
sense from a BDD perspective. As a result the lists below will in
some places differ from the structure of the tutorial, but
hopefully with good reason (& explanation).

In general we tried to _not_ test things that were more about
layout, labelling, and other "look & feel" features. These are the kinds of things that people might reasonably want to tweak
without small changes to, e.g., the shade of blue or the height
of the navbar, breaking the tests.

Also, there are places where it was
hard to test anything without adding some additional HTML
`class` or `id`s to the code. There wasn't an easy way to get
the products in the product list, for example, so we added
a class to those so we could easily pull a product "section"
out as a single element.

- [Features from the Angular source repo](#features-from-the-angular-source-repo)
  - [Their page elements (& a related weakness)](#their-page-elements--a-related-weakness)
  - [Their features](#their-features)
- [Page 1: A Sample App](#page-1-a-sample-app)
  - [Initial codebase & top bar](#initial-codebase--top-bar)
  - [Displaying product and descriptions](#displaying-product-and-descriptions)
  - [Adding "Share" buttons](#adding-share-buttons)
  - [Adding "Notify Me" buttons](#adding-notify-me-buttons)
- [Page 2: In-app Navigation](#page-2-in-app-navigation)
- [Page 3: Manage Data](#page-3-manage-data)
- [Page 4: Forms for User Input](#page-4-forms-for-user-input)
- [Page 5: Deployment](#page-5-deployment)

---

## Features from the Angular source repo

[The Angular source repo](https://github.com/angular/angular)
actually has
[some limited E2E tests for the "finished" tutorial](https://github.com/angular/angular/blob/master/aio/content/examples/getting-started/e2e/src/app.e2e-spec.ts).
Nic isn't convinced that these are all that complete, and some
are fairly fragile (e.g., testing for labels like "Products"),
but it seemed useful to document them here.

:bangbang: It's interesting to note that pretty much _all_
their tests use `async` and `await`, and not always in ways that
Nic fully understands.

### Their page elements (& a related weakness)

They don't use a separate "page object" class, but they do
declare a set of `pageElements` at the start of the top-level
`describe`:

```javascript
  const pageElements = {
    topBarHeader: element(by.css('app-root app-top-bar h1')),
    topBarLinks: element(by.css('app-root app-top-bar a')),
    topBarCheckoutLink: element(by.cssContainingText('app-root app-top-bar a', 'Checkout')),
    productListHeader: element(by.css('app-root app-product-list h2')),
    productListItems: element.all(by.css('app-root app-product-list h3')),
    productListLinks: element.all(by.css('app-root app-product-list a')),
    productDetailsPage: element(by.css('app-root app-product-details div')),
    cartPage: element(by.css('app-root app-cart'))
  };
```

Note that most of these are accessed through sequences of css
elements of the form:

```javascript
   'app-root <component selector> <HTML tag>'
```

The `app-root` ensures that we're only accessing elements of the
Angular app. The component selector focusses attention on a
specific component in the app, and the HTML tag further focuses
on a specific part of that component.

This approach doesn't really seem
optimal, though. It assumes that a given component will only use
an HTML tag for a single thing. Here, for example, they assume
that each product in a `app-product-list` will only have a
_single_ link (`a` tag), when one could easily imagine
extensions of this where a product might have multiple links.

It also doesn't allow us to easily connect logically related
components. `productListItems`, for example, is a sequence of
product titles, and `productListLinks` is a sequence of links
in each product. These are parallel arrays in the sense that the
first item in `productListItems` and the first item in
`productListLinks` both refer to the same product, and similarly
for `productDetailsPage`. By accessing them through HTML tags
like this means we don't have a nice way to connect related
elements and have to "join them up" ourselves through the
parallel arrays (which the Angular E2E test don't do).

Providing specific `class`es for the page elements would
arguably make the code more readable and less fragile, and
would give us the ability to extract, for example, a sequence
of `product-element`s, each of which would have a title, a link,
and details. Our tests could then more easily specify
relationships between those parts than we can with the parallel
arrays approach.

### Their features

The descriptions below refer to the elements listed above.

- General ("general" features of the "home page" `'/'`)
  - [ ] Should display "My Store" in the top bar header
  - [ ] Should display "Products" in the product list header
- Product list
  - [ ] Should display three items in `productListItems`.
    - They don't say anything about _what_ those items are,
      just that there three _somethings_ there.
- Product details
  - Displaying the details
    - They click the first product list link.
    - They get the product details page (which is presumably
      displaying the details of the first product).
    - They specify details for the first product using
      an additional set of page elements using HTML tags on the
      details page: `productHeader`, `productPrice`, and
      `productDescription`.
      - [ ] Product header should be `'Phone XL'`
      - [ ] Product price should be `'$799.00'`
      - [ ] Product description should be `'A large phone with one of the best screens'`
  - Clicking "Buy" button should add the item to the cart
    - They click the first product list link.
    - They get the product details page (which should contain
      the button).
    - The get the button.
    - They click the button.
    - They wait for the alert.
    - They get the "OK" button on the alert.
    - They click the checkout link in the top bar.
    - They get all the items in the checkout cart.
    - [ ] That list of items should have length 1. (Note that
          they _don't_ check any properties of that item, e.g.,
          they don't check that the _correct_ item got added to
          the shopping cart.)
- Shopping cart
  - :warning: _The sequence below is **not** the sequence in
    the tests, which seem kinda random. That sequence might be
    useful in giving things a chance to "settle", though, but
    that's obvious._
  - They clock on the first product list link.
  - They get the "Buy" button on the details page.
  - They click the "Buy" button.
  - They wait for the alert and click "OK".
  - They get the cart page.
  - They get the input fields from the cart page.
  - They fill in the name and address fields.
  - They get the "Purchase" button.
  - They click the "Purchase" button.
  - They get the log entries.
  - [ ] They confirm that there's one log entry that includes
        the message `'Your order has been submitted'`.

---

## Page 1: A Sample App

The first page of the tutorial
(["A Sample App"]((https://angular.io/start))) provides the
initial code base essentially _de novo_ and without any
particular motivation. It then extends that to:

- Display all the products and descriptions
- Add "Share" buttons on each product (that just creates an
  alert)
- Add the "Notify Me" buttons on products with prices over $700
  (which also just creates an alert)

### Initial codebase & top bar

The initial code base provides two components "out of the blue":

- `top-bar`
- `product-list`

The initial code also includes a `CSS` file that isn't strictly
necessary from a functional perspective (so no tests will
probably) without it, but it's probably a good idea to include
so that things will look nice. :smile:

Tasks:

- [ ] Create a new, empty Angular app with `ng new`
- [ ] Copy over the CSS file
- [ ] Spec stuff… 

### Displaying product and descriptions

### Adding "Share" buttons

### Adding "Notify Me" buttons

---

## Page 2: In-app Navigation

## Page 3: Manage Data

## Page 4: Forms for User Input

## Page 5: Deployment

Are we actually going to do this? Not sure.
