/*

#1 Zero coupling between child projects
- No importing of functions/objects/classes/etc
- No shared state
- Shared libraries through ModuleFederation is OK

#2 Near-zero coupling between container and child apps
- Container shouldn't assume that a child is using a particular framework
- Any necessary communication done with callbacks or simple events

#3 CSS from one project shouldn't affect another

#4 Version control (monorepo/separate) shouldn't have any impact on the overall project
- Some people want to use monorepos
- Some people want to keep everything in a separate repo

#5 Container should be able to decide to always use the latest version of a microfrontend or specify a specific version
- Container will alwasy use the latest version of a child app (doesn't require a redeploy of container)
- Container can specify exactly what version of a child it wants to use  (requies a redeploy to change)


=======================

const element = createCustomElement(CourseTitleComponent, {injector: this.injector});
customElements.define('app-course-title', element); // customElements is available in window

in app-module --> entryComponents: [CourseTitleComponent]



- Technology Flexibility: 
  - can be developed using different tech stacks

  - Scalability: 
  - applications are broken down into small pieces based on business logic
  - Each team can work independently on multiple MFE. 
  - MFE will not affect the rest of the frontend or other teams’ work.

  - Isolation for Development and Deployment: 
  - Each team operates in isolation, 
  - enabling them to develop, test, and deploy their frontend component without relying on other teams. 
  - This streamlined process enhances efficiency and speed.

  - Maintainability: 
    - Large-scale applications can become hard to maintain. 
    - MFE addresses this challenge by dividing the application into small parts, 
    - with each team responsible for maintaining their designated section. 
    - If any micro feature or part experiences issues, it doesn’t disrupt the rest of the app.

----------------------------------------------
- install @angular/elements package and import
- ng new mfe - Create a new Angular project    
- remove the default bootstrap from @ngModule()
- app module add ngDoBootStrap() 
- inside the method we need to use the createCustomElement and pass the component which you wants make it mfe 
- also pass the injector
- customeElements.define give the mfe name and pass the element

"bundle": "ng build --output-hashing none && node concat.js"

import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const element = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('app-micro-fe', element); // customElements is available in window
  }
}


Create a new project. 
. ng new micro-frontend

Bash
Install Angular elements:
npm i @angular/elements
HTML
Edit your app.component.html to be something simple, like hello world:
<p>Hello from micro frontend component!</p>
HTML
Edit your app.module.ts to import Injector from @angular/core, make the bootstrap array empty, and add the custom element app-micro-frontend. Name it whatever you like, although the Angular convention starts with app. Your app.module.ts should look like this:
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {

  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const element = createCustomElement(AppComponent, {
      injector: this.injector
    });
    customElements.define('app-micro-frontend', element);
  }
}
React TSX
Replace app-root with your new element app-micro-frontend in your index.html file in order to reflect your new element. It should look like this:
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MicroFrontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-micro-frontend></app-micro-frontend>
</body>
</html>
React TSX
Optional

You may want to test your project first with ng serve, which should work with the newly created element.
If you’re reading this from the future when Zoneless Signals are ready (hopefully Angular 17+), then you will want to get better performance in reactivity by opting out of Zone.js. Edit your main.ts file to add the noop argument like so:
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: 'noop' })
  .catch(err => console.error(err));
React TSX
Add a bundle command to your package.json file under scripts. Unfortunately, Angular does not have an option to make sure there is only one JS file when building.
ng build -c production will build the production version of your app. -prod was depreciated and no longer works.
--output-hashing=none is also necessary so the separate JS files do not have a long hash added to their name.
cat ./dist/ANGULAR_PROJECT_NAME/*.js > ./dist/ANGULAR_PROJECT_NAME/app-micro-frontend.js – This will allow you to concatenate all the production JS files into one large JS file called app-micro-frontend.js. However, cat may not be available on your machine by default. Windows has the type command and PowerShell has get-content, etc. To keep this working across all devices, I decided to use bash with cat. I don’t want to create a whole new script when a command should suffice here.
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "bundle": "ng build -c production --output-hashing=none && bash -c \"cat ./dist/micro-frontend/*.js > ./dist/micro-frontend/app-micro.js\""
  },
JSON
Run npm run bundle to bundle your application.

Go to the ./dist/micro-frontend folder and edit the index.html file. Replace the three script import tag files: runtime.js, pollyfills.js, and main.js with app-micro.js:

<!doctype html>
<html lang="en" data-critters-container>
<head>
  <meta charset="utf-8">
  <title>MicroFrontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"></head>
<body>
  <app-micro-frontend></app-micro-frontend>
  <script src="app-micro-frontend.js" type="module"></script>
</body>
</html>
HTML
Edit the base path to work correctly with your live-server extension. You may not need to do this if you use another server for testing.
<base href="/dist/micro-frontend/">
HTML
Right-click the ./dist/micro-frontend/index.html file and click “Open with Live Server.” You should now see the final web component:
Hello from micro frontend component!

*/