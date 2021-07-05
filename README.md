# Getting Started with Angular - My Store

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
