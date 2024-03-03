/** 

Angular directives are a powerful feature that allow you to create reusable pieces of HTML functionality. 
and they enable you to extend HTML with custom behaviors and DOM manipulations. 

There are mainly three kinds of directives,

Components — These are directives with a template.

Structural directives — These directives change the DOM layout by adding and removing DOM elements.
Examples: ngIf, ngFor, and ngSwitch.

Attribute directives — These directives change the appearance or behavior of an element, component, or another directive.
Examples: ngClass, ngStyle, and ngModel.
---------------------

custom directive examples
-----------------------------
[allowOnlyNumber]
[passwordMask]
[stickyElement]
[formatInput]

To create a custom directive in Angular, you'll follow these steps:

Create a Directive Class: You'll create a TypeScript class that represents your custom directive. This class will extend Directive from @angular/core and define the behavior of your directive.

Decorate the Class: You'll use the @Directive decorator to define metadata for your directive. This metadata includes the selector (how you'll use the directive in your HTML), any input or output properties, and other configuration options.

Implement the Logic: Inside the directive class, you'll implement the logic that you want the directive to perform. This might involve manipulating the DOM, interacting with services, or modifying element properties.

Here's an example of creating a simple custom directive that changes the background color of an element when clicked:


import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16); // Generates a random color
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}

In this example, the HighlightDirective is created. It uses the @Directive decorator with a selector of [appHighlight], which means it will be applied to elements with the attribute appHighlight. The @HostListener decorator is used to listen to the click event on the host element, and when the event is triggered, the background color of the element is changed using the Renderer2 service.

To use this directive in your template:

<div appHighlight>Click me to highlight</div>
When the <div> is clicked, the background color will change to a random color.

Remember to include your custom directive in the appropriate module's declarations array to make it available throughout your application.

Creating custom directives in Angular allows you to encapsulate behavior and enhance reusability in your application's codebase.


*/