/*

View encapsulation is a mechanism that ensures styles defined in a component are scoped to that component only, 
preventing them from leaking into other components and vice versa. 

Angular provides three view encapsulation strategies: 


@Component({
  selector: 'app-example',
  template: '<p>Example Component</p>',
  styles: ['.example-component { color: red; }'],
  //encapsulation: ViewEncapsulation.Emulated (default - creates unique attribute for the elements)
  //encapsulation: ViewEncapsulation.ShadowDom (not all browser have support - creates native shadow dom)
  //encapsulation: ViewEncapsulation.None (it will create global styles)
  //encapsulation: ViewEncapsulation.Native (deprecated don't use it)
})


1. Emulated View Encapsulation (Default): (unique attributes to the component's elements at runtime)
--------------------------------------------------
Styles defined in a component's stylesheets are scoped to that component's 
Angular adds unique attributes to the component's elements at runtime.

2. Shadow DOM View Encapsulation:
--------------------------------------------------
browser's will create native Shadow DOM to encapsulate styles within components.
component styles are isolated from the rest of the document.

    When to Use:
    Use shadow DOM encapsulation when you need strict style isolation similar to web components.

3. None View Encapsulation:
--------------------------------------------------
styles defined in a component will affect the entire application

    When to Use:
    we should Use none encapsulation very sparingly and only for specific use cases where you need global styles or custom styling behavior.
    Suitable for styling global elements or applying styles that should not be encapsulated within a single component.




:host ::ng-deep :host-context
=======================================
 the :host and ::ng-deep selectors are used to style the host element of a component and apply styles based on the context of the host element, respectively. Let me explain each of them:

:host:
-----------
The :host pseudo-class selector is used to target the host element of a component from within the component's style encapsulation.

It allows you to apply styles directly to the host element of the component, which is the element to which the component selector is attached in the template.

Here's an example of using :host to style the host element:

:host {
  display: block;
  border: 1px solid black;
}
In this example, the host element of the component will have a display of block and a border of 1px solid black.

::ng-deep:
----------------
The ::ng-deep combinator is used to override the view encapsulation of Angular components and apply styles to child components or elements.

It allows styles defined in a component to "leak out" and apply to child components or elements, even if they have their own encapsulated styles.

Here's an example of using ::ng-deep to target elements inside a child component:

:host ::ng-deep .child-element {
  color: red;
}
In this example, the .child-element inside the host element of the component will have its color set to red, even if the child component has its own encapsulated styles.

:host-context:
--------------------------
The :host-context pseudo-class selector is used to apply styles to the host element based on its ancestors in the DOM tree.
It allows you to style the host element based on the presence or absence of a class or attribute on any ancestor element.
Here's an example of using :host-context to style the host element based on the presence of a class on any ancestor element:

:host-context(.dark-theme) {
  background-color: black;
  color: white;
}

In this example, if any ancestor element of the host element has the class dark-theme, the host element will have a black background color and white text color.    



*/