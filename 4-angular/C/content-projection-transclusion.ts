/*
Transclusion or Content Projection

“Transclusion or content projection lets you define a placeholder in your component’s template where any content from the parent gets inserted. 
This is done with <ng-content>. For example, a custom card component can have a header and footer, but whatever you put between <app-card>...</app-card> 
in the parent shows up inside the card where <ng-content> is. This makes components more reusable and flexible.”


content projection (configurable components) (content between the element tags will be replaced in <ng-conten>
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



In this example, the content between the <app-child> tags in the parent component template will be transcluded (projected) into the <ng-content> directive in the child component's template. 
This allows the child component to display custom content provided by the parent component while maintaining its own structure and functionality.

*/