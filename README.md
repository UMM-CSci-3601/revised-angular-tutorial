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

## Start making components

### Create the `top-bar` component

We created an E2E spec that required (indirectly through the page objects) the existence of an `app-top-bar` component. (ce1e3db) We then satisfied that spec by generating the component:

- `ng generation component top-bar`

and replacing the entire contents of `app.component.html` with the HTML from the tutorial, which includes adding:

```typescript
<app-top-bar></app-top-bar>
```

at the top. (35ff8b2)

We then added an E2E spec that required that there be a checkout button, and got that to pass by pasting in the button code from the tutorial. (9421cb8)

At this point the top bar is complete except for the fact that "My Store" should be a link to `'/'`. So we added an E2E spec that clicked on the title
and checked that we were on the "home page". (9f3046d) This is a slightly awkward test
at the moment because _everything_ is on the home page; we should probably
extend it when there are additional pages to make sure the link brings us
back home from those pages.

This completes the top bar for now.

### Create a `product-list` component

As well as creating the component, we also need to route the default path to the `product-list` component. This requires adding this bit of code to `app.module.ts`:

```typescript
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
    ])
```

- `ng generate component product-list`
