# Basic

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

----------

<!-- ## Installation

> 1. git clone http://git.vivaconnect.co/angular-boilerplate/basic.git
> 1. npm install -->

## Architecture

### Project Folder Structure

```ts
|-- app
    |-- modules
        |-- [+] authentication
        |-- dashboard
           |-- [+] components
           |-- [+] pages
           |-- dashboard-router.animations.ts
           |-- dashboard-routing.module.ts
           |-- dashboard.module.ts
        |
    |-- core
        |-- [+] guards
        |-- components
            |-- page-not-found
                |-- page-not-found.component.ts|html|scss|spec.ts
                |-- page-not-found.animations.ts
            |
        |-- [+] http
        |-- [+] mocks
        |-- [+] interceptors
        |-- [+] interfaces
        |-- [+] services
        |-- core.module.ts
    |
    |-- shared
        |-- [+] components
        |-- [+] directives
        |-- [+] pipes
        |-- shared.module.ts
    |
    |-- app.component.ts|html|scss|spec.ts
    |-- app-router.animations.ts
    |-- app-routing.module.ts
    |-- app.module.ts
|-- assets
    |-- [+] images
    |-- [+] fonts
    |
|
```

|Symbol|Represents|
|---|---|
|\|--|folder/file node|
|\||has additional sibling folders/files|
|[+]|folder has additional child folders/files|
|\<file-name\>.ts\|html\|scss\|spec.ts|files with same name but different extensions|

#### Core Module (core)

The CoreModule contains singleton services, universal components and other features where there’s only once instance per application. To prevent re-importing the core module elsewhere, a guard for it is added in the core modules’ constructor.

```ts
|-- core
        |-- [+] guards
        |-- components
            |-- page-not-found
                |-- page-not-found.component.ts|html|scss|spec.ts
                |-- page-not-found.animations.ts
            |
        |-- [+] http
        |-- [+] mocks
        |-- [+] interceptors
        |-- [+] interfaces
        |-- [+] services
        |-- core.module.ts
```

##### guards

The guards folder contains all of the guards require to protect different routes in my applications. In addition it also contains some services that prevents certain actions.

```ts
|-- guards
    |-- already-logged-in-user
        |-- already-logged-in-user.ts|spec.ts
    |-- [+] not-logged-in-user
```

##### components

The components folder contains all the universal components that can be singleton. Error page components such as **404 not found** or **500 server error** can be a part of this module.

```ts
|-- components
    |-- page-not-found
        |-- page-not-found.component.ts|html|scss|spec.ts
        |-- page-not-found.animations.ts
    |
```

##### http

The http folder handles all http calls from out application.

```ts
|-- http
    |-- api
        |-- app.service.ts|spec.ts
    |
```

The api folder handles http calls for predefined url from **environment.ts|prod.ts** files.

The folder does otherwise contain folders for interacting with the different API-routes. For e.g., getting real time json data for different business use cases.

##### mocks

Mocks are useful for testing, but you can also use them to retrieve fictional data until the back-end is set up. This specific mocks folder contains all the mock-files of our app. These mock files are essentially just data exports.

```ts
|-- mocks
    |-- users.mock.ts
    |-- report.mock.ts
    |-- summary.mock.ts
```

##### interceptors

This allows us to catch and modify the requests and responses from our API calls. In addition to below interceptors, one can add *error-handler.interceptor* for error responses globally before passing to respective callbacks function.

```ts
|-- interceptors
    |-- token
        |-- token.interceptor.ts|spec.ts
    |-- mock-backend-providers.interceptor.ts
```

This also contains a *mock-backend-interceptor* which will put a halt to any requests and return predefined responses, which is  useful for mocking backend and testing the app.

##### interfaces

Interfaces contain type definitions for enforcing strict type checking.

```ts
|-- interfaces
    |-- login.interface.ts
```

##### services

All additional singleton services are placed under services folder

```ts
|-- services
    |-- [+] date-time-range
    |-- [+] format-time
    |-- logout
        |-- logout.service.ts|spec.ts
    |-- [+] state
```

#### Shared Module (shared)

The *SharedModule* is where any shared components, pipes/filters and services should go. The SharedModule can be imported in any other module when those items will be re-used. The shared module shouldn’t have any dependency to the rest of the application and should therefore not rely on any other module.

```ts
|-- shared
    |-- components
        |-- kpi
            |-- kpi.component.ts|html|scss|spec.ts
    |-- directives
        |-- ripple-on-click
            |-- ripple-on-click.directive.ts|spec.ts
    |-- pipes
        |-- copyright
            |-- copyright.pipe.ts|spec.ts
    |-- shared.module.ts
```

Typically SharedModule should not be imported in the root module, but instead should be imported in those modules that needs to use the exported items.

#### Modules

Contains all the feature/eagerly modules as well as lazy modules. It is just a folder for grouping modules and is not a module on its own.

```ts
|-- modules
    |-- [+] authentication
    |-- dashboard
        |-- [+] components
        |-- [+] pages
        |-- dashboard-router.animations.ts
        |-- dashboard-routing.module.ts
        |-- dashboard.module.ts
    |
```

A single module, for instance, the **DashboardModule** is comprised of *components* and *pages* folders and 3 files, *dashboard-router.animations.ts*, *dashboard-routing.module.ts* and *dasboard.module.ts* for specifying animations, routes and module definition respectively.

**components** folder contains components that are exclusive to this module and will not be used by other modules. If a component needs to be reused by another component; move the component to the shared module and export the same.

```ts
|-- components
    |-- action-bar
        |-- action-bar.component.ts|html|scss|spec.ts
    |-- footer
    |-- header
```

**pages** folder is made up of components whose sole responsibility is *provide* for their child components. They do not show any data of their own.
They have a variety of role.
- As a smart parent component to provide @Input data to their dumb child components.
    This way all the computations and service requests are done at the smart components level.
- It contains *components* folder comprising of one to many dumb child components.
- Defines animations.

> *Note:* Any component can define and execute animations on view of its own and it's child components.

- Provide an array of services used exclusively by the component and its child.
  This can be done by setting an array for the **providers** key in the **@Component** decorator, and passing the service in the array.

> *Note:* The scope of the services defined in the **providers** array is that of the component, so it will not be available outside of the component.

```ts
|-- pages
    |-- details-page
        |-- details-page.component.ts|html|scss|spec.ts
        |-- details-page.animations.ts
        |-- details-page.service.ts
        |-- components
            |-- [+] report-datatable
    |-- home-page
    |-- summary-page
```

A module if lazy also needs to define routes of its own, hence one of its components must be a default component.
This responsibility is carried out by the **home-page** component of the **DashboardModule**.

> Both the **AuthenticationModule** and **DashboardModule** are lazy loaded and both of them have their own routing module.
>
> While **CoreModule** is eagerly loaded, it does not has it's own routing module since it's job is to only provide singleton services.
>
> **SharedModule** is only imported by modules that requires it's exports.

---

## Deployment

### Build Angular app

```bash
ng build --prod --output-path=dist
```

By default, the output path of build is **dist\/\<app-name>**.
One can change that in **angular.json** file

```json
"projects": {
    "<app-name>": {
        "architect": {
                "build": {
                    "options": {
                        "outputPath": "dist"
```

But to provide flexibility, one can supply **--output-path=\<path-name>** to specify build path.

### Dockerize

```bash
docker build -t basic-boilerplate .

docker run -p 5200:80 --name basic-boilerplate -d basic-boilerplate
```

Open **http://localhost:5200** in browser.

<style>
.separator {
    --line-gap: 10px;
    height: 1px;
    width: calc(100% - (var(--line-gap) * 2));
    position: relative;
    left: var(--line-gap);
}
</style>