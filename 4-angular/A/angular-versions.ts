/*

Version	Release	Major Features
1.x	2010	AngularJS (MVC, two-way binding, controllers, scopes)
2	2016	Components, TypeScript, RxJS, rewrite
4	2017	Smaller bundles, SSR, *ngIf improvements
5	2017	Build optimizer, PWAs, Universal state transfer
6	2018	Angular Elements, CLI updates, library support
7	2018	Virtual scroll, drag/drop, CLI prompts
8	2019	Differential loading, Ivy preview
9	2020	Ivy default, improved debugging
10	2020	Date range picker, stricter CLI
11	2020	Faster builds, font inlining, better CLI
12	2021	Ivy everywhere, nullish coalescing, TS 4.2
13	2021	IE11 dropped, package format, dynamic comp creation
14	2022	Standalone components, typed forms
15	2022	Standalone stable, directive composition
16	2023	Signals (preview), SSR hydration
17	2023	Signals stable, new control flow, view transitions
18	2024	Standalone-first, full signals, SSR/SSG
19*	2024*	(Forecast) More signals/standalone, CLI simplification
20*	2025*	(Forecast) Standalone everywhere, best SSR, web APIs

Angular 17
===========================
- Logo redesign
- angular.io to angular.dev
- Control flow syntax

        <h1>Angular 17</h1>
        @if (isUserAvailable) {
        <p>User available</p>
        } @else {
        <p>User Not available</p>
        }

        <!-- Angular 16 and previous versions -->
        <div *ngFor="let item of items; let i = index;">
        <p>{{ item }}</p>
        </div>

        <!-- Angular 17 -->
        @for (item of items; track item.id) {
        <p>{{ item }}</p>
        }

        <!-- Angular 16 and previous versions -->
        <div [ngSwitch]="color"> 
        <app-color *ngSwitchCase="red"/>
        <app-color *ngSwitchCase="blue"/>
        <app-default-color *ngSwitchDefault/>
        </div>

        <!-- Angular 17 -->
        @switch (color) {
            @case ('red') {
                <app-red-color />
            }
            @case ('blue') {
                <app-blue-color />
            }
            @default {
                <app-default-color />
            }
        }        

- Deferrable views (using @deffer templates, we can lazy load components when a condition is met)

    if we want to display a separate component, when “user scrolls to that section” or “in 5 seconds” we can use @deffer templates.

        @defer (when show) {
            <ns-demo-component />
        }
        @placeholder {
            <div>Something until the loading starts</div>
        }
        @loading (after 500ms; minimum 500ms) {
            <div>Loading...</div>
        }
        @error {<div>Something went wrong</div>
        }

    deferrable views contain the below triggers.
        on idle — lazy load when the browser is idle
        on immediate — lazy load immediately
        on timer() — delay loading with a timer
        on viewport
        on interaction and on interaction() — lazy load when the user interacts with a particular element
        on hover and on hover() — lazy load when the user hovers an element

- Signals: stable
- Dev tools
- Server-side rendering improvements (ng new angular-demo-application --ssr)
- New Lifestyle hooks (afterRender and afterNextRender)
        - afterRender can be used to register a callback which will be invoked every time the application finishes rendering 
        - afterNextRender can be used to register a callback to be invoked the next time the application finishes rendering.
- Style and Style Urls as Strings
- Performance Improvements
- Security Improvements

Angular 16
===========================
Along with performance imporovement, they have introduced new features like 

- Angular Signal (for better change detection) (Signal is based on Solid.js it uses push & pull to retrieve and update the value this new feature will improve the change detection mechanism)
- added Server-Side Rendering (SSR) - React has SSR support now even Angular supports SSR
- Required input (@Input({ required: true }) name: string = ''; # ability to make certain inputs required.)
- DestroyRef injector - DestroyRef provider provides a convenient way to handle cleanup operations when destroyed
- Standalone Project Support (Angular 14 started supporting standalone components, which are independent of modules. Angular 16 takes this to the next level by supporting standalone project creation.)

Angular 15
===========================
Improved performance (lazy loading of modules and components)
web workers (ability to create and manage web workers from Angular code)
Improved support for TypeScript: like generics with Angular types
Jest with Angular (ability to use Jest with Angular)

Angular 14
===========================
- offline availability
- standalone components 
- strictly typed forms
- auto-completion and extended diagnostics among others.

Angular 13
===========================
Improved performance: Angular 13 includes a number of performance improvements, such as lazy loading of modules and components.
New features for web workers: Angular 13 includes new features for web workers, such as the ability to create and manage web workers from Angular code.
Improved support for TypeScript: Angular 13 includes improved support for TypeScript, such as the ability to use generics with Angular components.
New features for testing: Angular 13 includes new features for testing, such as the ability to use Jest with Angular components.

Angular 12:
===========================
Released in May 2021.
Focused on improving the developer experience.
Introduced strict mode by default, enhancements in the Angular CLI, and more.

Angular 11:
===========================
Released in November 2020.
Introduced improved loading performance and increased bundle size reduction.
Added stricter types and enhanced the Angular CLI.

Angular 10:
===========================
Released in June 2020.
Introduced stricter types and improved TypeScript support.
Improved the Angular CLI.

Angular 9:
===========================
Released in February 2020.
Ivy Renderer became the default rendering engine. ##########
Improved bundle size and performance.
Introduced updated forms APIs.

Angular 8: // (Ivy renderer opt-in feature) #################################
===========================
Released in May 2019.
Introduced differential loading for smaller bundles and improved performance.
Added Ivy Renderer as an opt-in feature.

Angular 7:
===========================
Released in October 2018.
Introduced improvements in Angular Material and CDK.
Added CLI prompts, virtual scrolling, and more.

Angular 6: ********************** (Ivy Renderer was introduced as an opt-in preview.)
===========================
Released in May 2018.
Introduced Angular Elements for creating custom elements.
Upgraded to RxJS 6, offering better performance and a more streamlined API.
Ivy Renderer was introduced as an opt-in preview.

Angular 5: (HttpClient as a replacement for HttpModule)
===========================
Released in November 2017.
Introduced HttpClient as a replacement for HttpModule.
Added support for Progressive Web Apps (PWA) with the introduction of the Angular Service Worker.

Angular 4: (Introduced template references, *ngIf and *ngFor syntax, and more.)
===========================
Released in March 2017.
Notable improvements in rendering and size reduction for production builds.
Introduced template references, *ngIf and *ngFor syntax, and more.

Angular 2:
===========================
Released in September 2016.
A complete rewrite of AngularJS, focused on performance, modularity, and improved architecture.
Introduced components, modules, services, and the concept of reactive programming with RxJS.

AngularJS (Angular 1.x):
===========================
AngularJS was the original version of Angular, often referred to as Angular 1.x.
Released in 2010 by Google.
Followed the principles of two-way data binding.

*/