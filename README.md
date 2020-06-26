# A BDD version of the "Phone Store" Angular tutorial

This is a version of [the "official" Angular "Phone Store" tutorial](https://angular.io/start) generated by @kklamberty and @NicMcPhee using a largely BDD (behavior-driven-development) approach. We're essentially starting with E2E (end-to-end) tests and using those to drive the
development of components, services, features, etc.

Our reason for this is that most of the commonly used examples, such as the phone store tutorial and [the Tour of Heroes tutorial](https://angular.io/tutorial), have no testing. This (sort of) makes sense from the standpoint of the Angular developers their goal is to teach Angular, not cover Karma and Jasmine and Protractor, etc. It's frustrating when one of the selling points of Angular is that it's a readily testable framework, though, but none of the major examples actually include testing.

Thus we hope that by documenting an example of how one could build the phone store tutorial in a largely BDD style we can provide:

- An example of using BDD to document, test, and drive the implementation of complex functionality
- Reasonable examples of writing E2E tests
- Reasonable examples of writing unit tests
- Suggestions for where to use E2E tests, and where to use unit tests

We will not repeat all the tutorial material and explanations in [the phone store tutorial](https://angular.io/start), so if you're new to Angular it would probably be useful to either go through that first, or at least be reading along through it while you're working through this tutorial. Based on our experience with students, however, there are some things (beyond testing) we will try to highlight or expand on, including:

- Observables and RxJS (& asynchrony in general)
- Parent/child component relationships

We might also provide a version of this that has all the E2E tests but none of the implementation code for those that would like to completely build the tutorial in a BDD fashion, but without having to write the tests first.

We will also not provide a complete tutorial on E2E tests with protractor or unit tests with karma, or on using jasmine to write tests. We will explain some of these ideas as we go, but you should hit up the Internet for a more complete introductions to those tools.

## Setting up the Angular client

### Create the Angular project

- `ng new phone-store`
  - :question: This creates a directory called `phone-store` in the project. Do we want to change the name to `client` to be more like our later structures?
  - At this point you can go into the `phone-store` directory and run `ng server` and see our little project! :smile: It of course doesn't actually _do_ anything interesting yet, but it does work.

### Setup GitHub Actions

@floogulinc set up the GitHub Actions based on work done in S20.
These are all laid out in [this pull request](https://github.com/UMM-CSci-3601/revised-angular-tutorial/pull/3).

For reasons we don't fully understand, this requires installing
some `webdriver-manager` binaries that didn't get installed on
their own. Without them, we can't run the `e2e` tests.

Running:

```bash
node_modules/protractor/bin/webdriver-manager update
```

installed the necessary binaries and all the tests ran and passed.

## Start making components

The tutorial starts you off with two components:

- `top-bar`, which has the app title and a checkout button
- `product-list`, which lists the products available at the store

and essentially no implemented "logic" except for the fact that the title links to the route `'/'`.

A question is what we can/should test about these components. The `top-bar` component, for example, has several properties that could be tested:

- It has a certain height.
- It has a certain background color (a blue).
- It contains an `h1` element with the string "My Store". This text is white against the blue background. This is a link; clicking it takes you to the `'/'` route, which at the moment is just the same page. (So it doesn't really seem to do anything at the moment, but will clearly serve a purpose when there is a second page and beyond.)
- It contains a checkout button containing both a shopping cart icon and the string "Checkout". The button is white, and the text and icon are blue.

Many of these are really _display_ properties (e.g., colors, sizes, layout) and probably shouldn't be captured in tests. We probably don't want an E2E test that checks that the shade of blue in the `top-bar` is "just so"; that would be really annoying if a design team came in and wanted to provided several possible color themes for consideration. It might also break the test if the user was using "dark mode" instead of "light mode", or the functionality was added later that let the user specify things like colors.

Things like the title (currently "My Store") are more complex. The fact that "My Store" is clearly not a good title is a sign that we might want to have tests that capture that exact text. Early in a project the team may not have settled on a title yet, and embedding it in the tests might prematurely "lock in" a title that no one is actually terribly fond of. So instead of testing for a specific title string, at the beginning maybe it would be sufficient to confirm that there is an `app-top-bar` element, and that it contains an `h1` element, without worrying about the text in that element.

### Create the `top-bar` component

We created an E2E spec that required (indirectly through the page objects) the existence of an `app-top-bar` component. ([ce1e3db](https://github.com/UMM-CSci-3601/revised-angular-tutorial/pull/1/commits/ce1e3db4d1b4dccd20624b82f90589bcfab92990)) We then satisfied that spec by generating the component ([35ff8b2](https://github.com/UMM-CSci-3601/revised-angular-tutorial/pull/1/commits/35ff8b2dead2b71bf08719429d6e07d4c341d096)):

- `ng generation component top-bar`

and replacing the entire contents of `app.component.html` with the HTML from the tutorial, which includes adding:

```typescript
<app-top-bar></app-top-bar>
```

at the top. ([594c6d1](https://github.com/UMM-CSci-3601/revised-angular-tutorial/pull/1/commits/594c6d1cf3b99311e6e4827a2f4f6076079c094b))

We then added an E2E spec that required that there be a checkout button, and got that to pass by pasting in the button code from the tutorial. ([9421cb8](https://github.com/UMM-CSci-3601/revised-angular-tutorial/pull/1/commits/9421cb8520c834454ea8b64776a10bfb89cdb7b0))

At this point the top bar is complete except for the fact that "My Store" should be a link to `'/'`. So we added an E2E spec that clicked on the title
and checked that we were on the "home page". ([9f3046d](https://github.com/UMM-CSci-3601/revised-angular-tutorial/pull/1/commits/9f3046dacf246745caff5da00a69e42163e2fd12)) This is a slightly awkward test
at the moment because _everything_ is on the home page; we should probably
extend it when there are additional pages to make sure the link brings us
back home from those pages.

The tests all passed, but we realized that there was no styling, so
we copied over the CSS from the tutorial and pasted it into our
project. We also needed to link to the Material Icons font in
`index.html` to bring in the shopping cart icon used in the checkout
button.

This completes the top bar for now.

### Create a `product-list` component

As well as creating the component, we also need to route the default path to the `product-list` component. This requires adding this bit of code to `app.module.ts`:

```typescript
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
    ])
```

- `ng generate component product-list`
