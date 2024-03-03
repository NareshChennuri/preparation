/*

View encapsulation is a mechanism that ensures styles defined in a component are scoped to that component only, 
preventing them from leaking into other components and vice versa. 

Angular provides three view encapsulation strategies: 


@Component({
  selector: 'app-example',
  template: '<p>Example Component</p>',
  styles: ['.example-component { color: red; }'],
  //encapsulation: ViewEncapsulation.ShadowDom
  //encapsulation: ViewEncapsulation.None
})


1. Emulated View Encapsulation (Default):
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

*/