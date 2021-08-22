# Getting Started with Angular - My Store

Visit [kind-forest-083ec3b10.azurestaticapps.net](https://kind-forest-083ec3b10.azurestaticapps.net) for a live demo on Azure.

## Angular Project Setup without Global CLI 

Angular was designed ab-ovo with a statically typed language TypeScript enforcing a structured approach for teams making large and complex enterprise quality applications. 
A number of tutorial videos on Angular are available still far the best source is the official documentation and its examples. 
Even the [Getting started with Angular](https://angular.io/start) is a simple but decent shopping cart application with product lists, state management, data entry forms and navigation. 
In this [video series](https://youtu.be/l5HqfsvrIpY) the [My Store](https://angular.io/start) application will be remade with some improvements. This series is meant for experienced programmers, assumed to have at least a basic understanding of 
JSON, HTML, CSS, Node JS, NPM, JavaScript and TypeScript, just to name a few. 

Installing [Angular CLI](https://github.com/angular/angular-cli) globally is not mandatory: **npx** (Node Package Executor) comes with the NPM installation. 
It downloads a package and its dependencies in memory, runs a command, and then drops the entire package when done. Actually, for Angular development npx can be used only when a new project is created, 
since the CLI itself is included in the generated project itself, and the **npm run ng** and other package scripts can be used to execute any ng commands. 

The project is created with  
**npx -p @angular/cli ng new --minimal -S --strict --interactive gettingstartedwithangular_mystore**  
The options **minimal** and **S** eliminate testing infrastructure.  
The **p** prefix option could define an alternative selector prefix instead of the default **app**. 

It's worth mentioning that Angular projects can be generated with **inline styling** (-s) and inline templating (-t) without any testing framework (--minimal) and testing files (-S); These simplifying options may be highly appreciated by one-man band startups. 

Visual Studio Code should be extended with two extensions: 
- Angular Language Service to make template editing a joy 
- ESLint extension to visualise linting issues while editing TS source files.

When looking at the source code of the component TS files, two issues can be identified: 

**Single quotes** are used for strings. Every proper language uses double quotes, and even JSON uses double quotes. To make string literals consistent in a multi-language environment and compatible with JSON, the linting rules should be changed to enforce double quotes. 

Since, even an Angular 12 project is not configured with ESLint, linting support has to be added manually with the command **npm run ng add @angular-eslint/schematics**

Then the following rule should be added in the **rules** section under **overrides** in the generated **.eslintrc.json** file 
**"quotes": ["error","double",{ "allowTemplateLiterals": true } ],**
The option allowTemplateLiterals is important to support backticks. 
The @typescript-eslint/quotes rule would work equally well. 

The other problem is that awkward **semicolons** are cluttering the source code, so to get rid of them the rule 
**"@typescript-eslint/semi": ["error", "never"],** should be added.
The simple "semi" rule is not enoughf, since it allows semicolons in classes. 

When any TS files are opened with these ES lint rules in place, Visual Studio Code automatically shows the issues with single quotes and semicolons. 

**npm run lint** script can be used to show the linting issues. 
To automate fixing the issues conveniently the script **"fix": "ng lint --fix"** can be added to package.json. 

To run the application use **npm start**, which executes ng serve. 

## Adding Material Schematic and Toolbar
The [My Store](https://angular.io/start#create-the-sample-project) sample application has two components preinitialized on [StackBlitz](https://angular.io/generated/live-examples/getting-started-v0/stackblitz.html). This sample didn't use any UI library, in my version I use [Angular Material](https://material.angular.io/components/toolbar/overview), possibly the most popular UI library for Angular.
- **npm run ng add @angular/material** to add Angular Material. For theme I picked Indigo/Pink.
- **npm run ng generate component top-bar** to create a top-bar UI component. Since I use double quotes and no-semicolons lint rules: **npm run fix**
    - [The API documentation of the toolbar component](https://material.angular.io/components/toolbar/api) explains how to import the module. This import should be done in the *app.module.ts* `import {MatToolbarModule} from "@angular/material/toolbar"` as usual with @NgModule imports.
    - [The Toolbar examples](https://material.angular.io/components/toolbar/examples) are good starting point to copy paste. The examples require `import {MatIconModule} from "@angular/material/icon"` and `import {MatButtonModule} from "@angular/material/button"`, too.
        - Don't keep the `<p>` element around the toolbar component, otherwise you will have a nasty white stripe/space above the toolbar.

## Adding Products List
Here is the accompanying video [Angular Getting Started 05 - Adding Product List Component](https://youtu.be/eLTyPu3-fyE).
- The data for the app are coming from a simple TS file *products.ts*, which I copied from the [stackblitz](https://angular.io/generated/live-examples/getting-started-v0/stackblitz.html) starter application.
- Then I created my second UI component **npm run ng generate component product-list**
- Since copying had single quotes and semicolons, run *npm run fix*
- Then I implemented the layout of products and the app.components template according to the stackblitz sample.

## Displaying Data in the Products List
Just follow the instructions in the [Create the product list](https://angular.io/start#create-the-product-list) section.
For the section [Pass data to a child component](https://angular.io/start#pass-data-to-a-child-component) 
create the UI component with **npm run ng generate component product-alerts**
After the initial implementation with regular HTML, I modified it to use Amgular Material List component. 
The accompanying video is [Angular Getting Started 06 - Displaying Products, Buttons and Toaster](https://www.youtube.com/watch?v=CtLKlW7BC_E)

Since Angular Material has no toast component, I used [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) instead of the plain browser *alert*.
**npm install ngx-toastr** Then I followed the instructions on the ngx-toastr documnet page.
The *"./node_modules/ngx-toastr/toastr.css"* is included in the NPM package, and should be added to *angular.json*
The ProductListComponent constructor is expecting a ToaterService, which is automatically injected by the Angular machinery.

## Adding Navigation
[Adding Navigation](https://angular.io/start/start-routing) is the next section in the Angular Getting Started tutorial series.
It assumes that the router module has been configured. Since I haven't configured router I'll do it manually, which is dead easy.
### Adding Router to an Existing Project
What is important that the `<base href="/">` in *index.html* has been set even when you didn't request router installation upon project initialization.
The [add-routing-existing-angular-project](https://www.samjulien.com/add-routing-existing-angular-project) covers the topic sufficiently.
- Add `import { RouterModule } from "@angular/router"` to *app.module.ts*
- Add `RouterModule.forRoot([{ path: "", component: ProductListComponent },])` to the imports section in *app.module.ts*
- Add `<router-outlet></router-outlet>` to app.components.ts template.

Here is the accompanying video [Angular Getting Started 07 Adding Router to an Existing Project](https://youtu.be/IO7a87Sq1-k)

### Generating product-details Component 
The accompanying video explains all details [Angular Getting Started 08 - Product Details with Material Card and Routes](https://youtu.be/ueJXIQkHh9k)
- Create the component **npm run ng generate component product-details** and for the sake of making the code less cluttered, since this is just a small demo application, I moved the generated TS file to the app folder from its original subfolder, and then I moved all the componnets to the app folder. This way I made a flat folder structure. 
The *--flat* option could also be used after an extra -- parameter like so
**npm run ng generate component product-details -- --flat** This is a limitation of not using the global ng CLI, tools.
- I created *appconstantsandtypes.ts* to make compiler-guaranteed safe route name and parameter references. 
    - I relocated the *Product* type definition from *products.ts* demo data into this file.
- I defined a route for this new *ProductDetailsComponent* in app.module.ts and I rearranged the path definitions
```
    RouterModule.forRoot([
      { path: `${RouteNames.products}/:${RouteParams.productId}`, component: ProductDetailsComponent },
      { path: `${RouteNames.products}`, component: ProductListComponent },
      { path: "", redirectTo: `${RouteNames.products}`, pathMatch: "full" },
    ])
```
- Then I added `[routerLink]="[routeName, p.id]"` to the items in the product-list.
    - To be able to reference the route name I added `routeName = "/" + RouteNames.products` to the class definition.
    This is terribly important approach in enterprise scale production systems. This way the actual route strings could be changed anyway the application
    remains functional and doesn't crash.
- For the *product-details* component Material Cards are used.
    - I defined the price in the subheader `<mat-card-subtitle>{{ product.price | currency:'EUR' }}</mat-card-subtitle>` using the Euro symbol for the *currency* pipe function.
    - I kept the two buttons: Like and Share from the example I copied from the Angular Material Card examples page.
    I created @Output emitters for them for cases where the ProductDetailsComponent were embedded into a component structure. Since, this time it is
    displayed via router outlet this direct and simple outup-linking is not applicable. For a solution see the next video. 
```
  @Output() share = new EventEmitter<Product>()
  @Output() like = new EventEmitter<Product>()
  onShareButtonClick(p:Product) {
    this.toastr.success(`${p.name} has been shared`, "My Store")
    this.share.emit(p)
  }
  onLikeButtonClick(p:Product) {
    this.toastr.success(`${p.name} has been Liked`, "My Store")
    this.like.emit(p)
  }
```
- To avoid relying on the browser back button, I added an exlicit back to products list anchort button, where an anchor element was marked with *mat-button*.
`<a mat-button color="primary" routerLink="/"><mat-icon>home</mat-icon> Products</a>`

## Component Communications via Router Outlets
[Angular: Emit Event Through Router Outlet](https://chinedujude.medium.com/angular-emit-event-through-router-outlet-53b55fbd1f28)
describes three ways where components, siblings, parents and children could communicate with each other even when they are instantiated via router outlet(s).
The main idea is that this technique makes a listener/observer to all output emitters of all the components created/instantiated via the router outlet of the app.component. The video [Angular Getting Started 09 Converting App Component to a Messaging Hub for All Routed Components](https://youtu.be/yIsri1HS9_4) explains the solution in detail.

The other option is very similar to the previous one, but instead of subscribing to all and each emitters, an event handler object is sent to the 
routed (child) components with a bunch of methods, and it's the job of the child component to call the appropriate ones. 
Actuallzy this is terribly similar to the mobile application architecture I elaborated for a fa,ily of mobile applications (Xamarin Android) using the pattern (Screens - Command Interfaces - Events Interfaces)
The video explanation for this solution is here [Angular Getting Started 10 Passing an Event Handler Object to the Routed Child Components](https://youtu.be/jCqG-OkoUSY)

The third option is to create a *MyStoreEventsService*.
The video explanation for this solution is here [Angular Getting Started 11 My Store Event Hub Service](https://youtu.be/qJ6i6V8Bc3Q)
- **npm run ng generate service mystore-events --flat** to make the service class directly in the *app* folder.
- Add an RXJS subject `onShareButtonClick = new Subject<Product>()` and that's all, no need to register in app.modules.
The @Injectable decorator is enough for the Angular machinery to inject the object to the classes that require it; in our case these are: *ProductListComponent*, *AppComponent* and *ProductDetailsComponent*, so `private myStoreEvents:MyStoreEventsService` should be added to their constructors.
- *app.components* still remains the central event handler hub, the eservice is only for transfering the events, it is not an event handler;
it starts a listener with a callback function, which is called when an event/message is fired. Subsriptions should be explicitly closed.
```
  private myStoreEvSubscr: Subscription | null = null
  ngOnInit(): void {  
    this.myStoreEvSubscr = this.myStoreEvents.onShareButtonClick.asObservable().subscribe((p:Product)=>{
      this.toastr.success(`${p.name} shared via Service`, "My Store")
    })
  }
  ngOnDestroy():void {
    this.myStoreEvSubscr?.unsubscribe()
  }
```
- The job of child component (event emitters) is very simple: `this.myStoreEvents.onShareButtonClick.next(p)` 

## Managing Data
[Managing data](https://angular.io/start/start-data#managing-data) is the next iteration in this series.
- Create a flat cart service **npm run ng generate service cart --flat** Note the extra dash-dash in the command, this is required since we use the ng CLI commands via *npm run*.
- Create a cart componnet **npm run ng generate component cart -- --flat**
- Create a shipping componnet **npm run ng generate component shipping -- --flat**
- [Unwrapping data from an observable](https://angular.io/guide/pipes#unwrapping-data-from-an-observable) explains why to use the *async* pipe in 
*shipping.component* template. The result and the return value of the `getShippingPrices():Observable<TShippingPrices[]>` in *cart.services* is an observable since it is created with an async HTTP GET request. This brutally elegant solution to make asyncronous data handling in templates: just add the async pipe and the Angular machinery automatically does the job. 
The video covering this topic is [Angular Getting Started 12 Cart Service and Component](https://youtu.be/q_yFEGm0bpQ)

## Forms Data Input
This sectin is a remake of [Using forms for user input](https://angular.io/start/start-forms) a really basic form builder intro.
The video covering this topic is [Angular Getting Started 12 Basic Form Builder](https://youtu.be/m9pBRKMuQlg)
Check out the [Angular 12 Getting Started 03 - Reactive Forms](https://youtu.be/LpktxKUA5Oo), which gives a lot more details on form development.

## Deployment over to Azure as Static App 
The full story is on this video [Angular 12 Getting Started 14 Deploying onto Azure as Static Web App](https://youtu.be/JQjqaB5Fs8U)
It was terribly important to:
- Merge the development branch into the *master* branch.
- Rename the build output folder to dist by removing the project name, otherwise it didn'twork with the Azure Static Web App extension.

Keep in mind that since now it is integrated with a live CI/CD pipeline, every committed modifications trigger redeployment on Azure automatically.


----
# Appendix: The standard Angular Doc for CLI Tasks and Scrits

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
