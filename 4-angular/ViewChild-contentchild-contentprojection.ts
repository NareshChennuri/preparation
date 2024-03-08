/*

content projection
-------------------
    <child-el> some content </child-el>

    child-el.html
    ---------------
    <ng-content></ng-content>  // will be replaced with "some content"


    

@ContentChild, @ContentChildren, @ViewChild, and @ViewChildren 
- used to query and access elements within components

- @ContentChildren and @ViewChildren return a QueryList


@ContentChild(SomeDirective) someDirective: SomeDirective;
@ContentChildren(SomeDirective) someDirectives: QueryList<SomeDirective>;
@ViewChild(SomeComponent) someComponent: SomeComponent;
@ViewChildren(SomeComponent) someComponents: QueryList<SomeComponent>;


@ContentChild:

Used to query and access the first occurrence of a directive or element within the content projection (ng-content) of a component.
Example: @ContentChild(SomeDirective) someDirective: SomeDirective;

@ContentChildren:

Used to query and access multiple occurrences of a directive or element within the content projection (ng-content) of a component.
Example: @ContentChildren(SomeDirective) someDirectives: QueryList<SomeDirective>;

@ViewChild:

Used to query and access the first occurrence of a directive or element within the component's own view, including its child components.
Example: @ViewChild(SomeComponent) someComponent: SomeComponent;

@ViewChildren:

Used to query and access multiple occurrences of a directive or element within the component's own view, including its child components.
Example: @ViewChildren(SomeComponent) someComponents: QueryList<SomeComponent>;
Key differences:

@ContentChild and @ContentChildren query elements projected into the component via ng-content.
@ViewChild and @ViewChildren query elements within the component's own template.
@ContentChild and @ViewChild retrieve the first occurrence, while @ContentChildren and @ViewChildren retrieve multiple occurrences.
@ContentChildren and @ViewChildren return a QueryList, which is a live collection that updates automatically when the queried elements change.




*/