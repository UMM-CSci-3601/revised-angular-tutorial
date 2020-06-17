# Revised Angular tutorial

A version of [the "official" Angular tutorial](https://angular.io/start) with
some additional material. We're assuming that the students have gone through that
tutorial previously, and that we'll essentially do the same thing here but with a
particular emphasis on:

- Observables and RxJS (& asynchrony in general)
- Parent/child component relationships
- Testing (Karma and E2E)

We're also thinking that we might provide E2E tests so they can do TDD/BDD development
on this project.

## Setting up the Angular client

### Create the Angular project

- `ng new phone-store`
  - :question: This creates a directory called `phone-store` in the project. Do we want to change the name to `client` to be more like our later structures?
  - :exclamation: This generated a project with a number of security warnings, 2 *high*, 3 moderate, and 3 low. Running `npm audit fix` made things better (only two left, both low), __but broke the code__ so that `ng serve` didn't work. [A little Internet searching suggested that `npm audit` was overly aggressive and updated a package in a way that didn't work](https://github.com/angular/angular-cli/issues/16902#issuecomment-620465294); `npm i @angular-devkit/build-angular@0.803.24` fixed the problem, but brought us up to 3 low severity warnings. I'd really like to better understand how to address these issues in a more reliable way.
  - At this point you can go into the `phone-store` directory and run `ng server` and see our little project! :smile:

### Create a `product-list` component

- `ng generate component product-list`
