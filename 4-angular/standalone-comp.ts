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


**/