/*

Angular 14 version introduced new feature called 'Standalone Components'

ng g c component_name  --standalone

Standalone component doesn’t belong to any specific Angular module. 
- Independent of modules 
- standalone component now is responsible for own dependencies, 
- can be lazy loade via (load component) like module 
- build process can be better optimize imports by tree shaking.

Instead of module + component you just have component.
Less code to write. 


when you create a component, you need to include it in the declaration array of a module; otherwise, Angular will throw an error during compilation. 
starting from Angular version 14, you can create standalone components that are not tied to any specific module. 
In addition to components, you can also create standalone directives and pipes.


advantages of Standalone Components
--------------------------------------------
it Simplifys the Angular learning process as we remove the NgModule concept,
we can lazy load the standalone components



ng g c component_name  --standalone

### @Component({standalone: true}) will be added as shown below

import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-my-standalone-component',
  standalone: true,  ****
  imports: [CommonModule],
  template: '<h1>Hello, World!</h1>'
})
export class MyStandaloneComponent {}


1. To Simplify Application Structure
Before: Every component had to belong to an NgModule (even for small features, utilities, or simple widgets).
Problem: Managing modules made small apps unnecessarily complex, confused newcomers, and led to lots of boilerplate.

2. To Make Angular More Modern and Flexible
The frontend world moved toward module-less or “single file” components (like React, Vue).

Standalone components let you declare, use, and test components without modules, making Angular more approachable and competitive.

3. To Enable Better Tree-Shaking and Performance
Standalone approach allows Angular to optimize bundle size by only including what’s needed, because dependencies are directly declared in each component.

4. To Improve Developer Experience
Less boilerplate: No need to write NgModule declarations, imports, exports, etc. for every feature.

Faster onboarding: Easier for new devs to learn Angular and start building quickly.

Simpler testing: Can test a component without worrying about modules or extra setup.

5. To Pave the Way for Future Features
Micro frontends: Standalone components are more portable and composable across apps.

Easier migration: Legacy apps can be incrementally updated to standalone components.



**/