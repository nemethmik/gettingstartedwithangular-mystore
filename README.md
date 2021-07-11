# Getting Started with Angular - My Store

## Step 1: Angular Project Setup without Global CLI 

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

## Step 2: Remaking CodeAffection's (Youtube) Angular Material Example
After I have initialized the project with *npx ng new --minimal* and configured ESLint, I decided to make a quick example with Angular Material and I picked 
[Complete Angular Material Tutorial - CRUD Form Design](https://www.youtube.com/watch?v=ZGWOc37kQkw)
In the video the author used direct npm commands to install Angular Material packages, but the [latest version](https://material.angular.io/guide/schematics) supported *ng add* schematics: 
- If you have Angular CLI globally installed you use *ng add @angular/material*, since I haven't installed Angular CLI globally I used **npm run ng add @angular/material**
  - [@angular/cdk](https://material.angular.io/cdk/categories) package - providing behavior primitives like accordion, bidirectionality, layout, collection, and so on and forth - is automatically added too.
  - The "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css" was added by the schematics to the *angular.json* styles section.
  - *link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"* was also added automatically to *index.html*
- To create the employees component I used **npm run ng g c employees** 
- Since the project was initialized with the minimal option, angular.json "remembers" this for later additions of schematics:
```
"@schematics/angular:component": {
          "inlineTemplate": true,
          "inlineStyle": true,
          "skipTests": true
        },
```
- **npm run ng g c employees/employee** created an employee component under employees.
The ngOnInit(): void {} in the component.ts files raised a linting error: Lifecycle methods should not be empty, and obviously lint --fix is not willing to fix these, so I changed the rule to a warning with adding "@angular-eslint/no-empty-lifecycle-method":"warn" to .eslintrc.json

- With **npm run ng g s shared/employee** I created a service. I didn't foloow exactly the author's approach, since I think a service component should be independent from any UI machinery, it should provide only the data for the UI components.

Important to note that linting errors didn't prevent successfull compilation and serving with **npm start**

I used the [Angular Material component documentation](https://material.angular.io/components/toolbar/api) to learn which modules to be imported into the app.modules.ts 
The author on the video created a custom module for importing and reexporting the material components, but I found it terribly meaningless, cumbersome, tedious and error-prone, so I deleted it; so, don't look for it in the source code.

Make sure to properly import a Material module **import {MatToolbarModule} from "@angular/material/toolbar"**, otherwise you will have the error message "Value at position X in the NgModule.imports is not a reference"
Reactive (Model Driven) form handling uses *FormGroup* in the service. **ReactiveFormsModule** should be imported from "@angular/forms" in the *app.module.ts*.
Before using a Material component in the template, remember to import that component module in app.module.ts, otherwise the corresponding mat-tag (mat-grid-list for example) will not be shown.

Pay attention, VSC (sometimes?) doesn't let select *ng-container* and other structural elements. Similarly the rounded bracket *(click)="onClick()"* has no special intellisense support in VSC, despite I have installed Angular Language Service extension. 
Note, that *double quotes* are not required for most locations when editing template **(click)=onClick()** just works fine, which I love, since this way the template is less cluttered.
A major observation was that for *radio group and selection fields* only string values work properly; checkbox supports boolean and date picker supports Date nicely, however.

## Step 3: Remaking CodeHandbook Angular Material Reactive Forms
The [CodeHandbook How To Create Angular Material Reactive Forms](https://www.youtube.com/watch?v=ebgnTuVNmzA) sample used FormBuilder instead of FormGroup and FormControls directly. FormBuilder is actually a wrapper on top of the FormGroup and FormControl infrastructure, it's only a convenience function. Actually an automatically injectable service, just define as parameter to a UI component's constructor and the Angular machinery injects an instance automatically.
The author added *FormsModule*, too, to app.modules.ts but I didn't since my understanding was that it is required only for [template driven forms](https://angular.io/guide/forms), it is not needed for reactive forms.
I created a separate UI component for this sample **npm run ng g c userprofileinfo**.
The form builder creates form group and controls behind the scene, which looks cool at first, but then you cannot use ```[formControl]``` in the template
only formControlName, so the compiler has no chance to check, if the name is misspelled. However, when the form is created in the Chrome debugger window and if there is a spelling error, then a red error message is show complaining about a non-matching field.

To decide which form to show open *app.components.ts* and change the component template from ```app-userprofileinfo``` to ```app-employees```.

At first I simply didn't understood where the hell he had those styling classes *row, col-sm-6, col-md-6*? I've even cloned your GitHub project, and I didn't find the trick. Then, I saw his video on [How to Install Bootstrap in Angular](https://www.youtube.com/watch?v=g9ucAJU0Bb8), and voila, I understood.The trick is that bootstrap and JQuery are installed *npm install bootstrap jquery popper.js* and then configured in the build configuration in angular.json
```
"styles": [
  "src/styles.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/popper.js/dist/umd/popper.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```
For details check out this video, actually, I havent installed these, since I didn't want to delve into learning Bootstrap styling for this demo, I wanted to keep the layout total simple.

# What's Next after this 1st and 2nd Sample?
- [Prime NG has a Form Layout](https://primefaces.org/primeng/showcase/#/primeflex/formlayout)
- [This explains the difference](https://appdividend.com/2019/12/16/angular-form-control-example/) between reactive and template driven forms.
- [Angular Forms official](https://angular.io/guide/forms-overview) documentation
- [creating-table-with-reactive-forms-in-angular-9-using-primeng-table2](https://www.c-sharpcorner.com/article/creating-table-with-reactive-forms-in-angular-9-using-primeng-table2/)
- [Angular For Beginners Guide by JavaTechie](https://www.youtube.com/watch?v=Tf_VWOSKOQ4&list=PLVz2XdJiJQxwAhzEZSpDqXlfT7XvNPDIE)


# This Section was Generated by the NG NEW Command

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
