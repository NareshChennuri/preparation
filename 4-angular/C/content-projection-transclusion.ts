/*
Transclusion or Content Projection

content projection (configurable components) (content between the element tags)
-------------------
    - we can customize look and feel of a component via content projection
    <child-el> some content </child-el>

    child-el.html
    ---------------
    <ng-content></ng-content>  // will be replaced with "some content"
    <ng-content select=".some-class"></ng-content>
    <ng-content select="img"></ng-content>



Transclusion in Angular:
Transclusion is a technique used in Angular to pass content from a parent component to a child component's template.
It allows you to create reusable components that can accept custom content, providing flexibility and customization options.
In Angular, transclusion is achieved using the <ng-content> directive, which acts as a placeholder for projected content.
The parent component can pass content to the child component by placing it between the opening and closing tags of the child component's selector.
The content provided by the parent component is inserted into the child component's template at the location of the <ng-content> directive.
Example:



In this example, the content between the <app-child> tags in the parent component template will be transcluded (projected) into the <ng-content> directive in the child component's template. This allows the child component to display custom content provided by the parent component while maintaining its own structure and functionality.

*/