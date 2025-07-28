/**

"Angular lifecycle hooks are methods that give you control over key moments in a component 
or directive’s existence — like creation, updates, and destruction. 
They allow us to run logic at specific stages."

Constructor → ngOnInit → ngOnChanges (if @input) → ngDoCheck → 
ngAfterContentInit (if ng-content) → ngAfterContentChecked (if ng-content) →
ngAfterViewInit → ngAfterViewChecked → afterNextRender -> afterEveryRender
ngOnDestroy

| **Phase**            | **Method**              | **Summary**                                                                                |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| **Creation**         | `constructor`           | Standard JavaScript class constructor. Runs when Angular instantiates the component.       |
| **Change Detection** | `ngOnInit`              | Runs once after Angular has initialized all the component's inputs.                        |
|                      | `ngOnChanges`           | Runs every time the component's inputs have changed.                                       |
|                      | `ngDoCheck`             | Runs every time this component is checked for changes.                                     |
|                      | `ngAfterContentInit`    | Runs once after the component's content has been initialized.                              |
|                      | `ngAfterContentChecked` | Runs every time this component's content has been checked for changes.                     |
|                      | `ngAfterViewInit`       | Runs once after the component's view has been initialized.                                 |
|                      | `ngAfterViewChecked`    | Runs every time the component's view has been checked for changes.                         |
| **Rendering**        | `afterNextRender`       | Runs once the next time that all components have been rendered to the DOM. *(Angular 17+)* |
|                      | `afterEveryRender`      | Runs every time all components have been rendered to the DOM. *(Angular 17+)*              |
| **Destruction**      | `ngOnDestroy`           | Runs once before the component is destroyed.                                               |




| 🔢 Order | 🔧 Hook Name              | 🕒 Called When                                          | 💡 Use Case Example                                                          |
| -------- | ------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1        | `constructor()`           | Component is instantiated                               | Inject services, initialize simple variables (avoid DOM or Angular bindings) |
| 2        | `ngOnChanges()`           | On every change to `@Input()` properties                | React to `@Input()` updates, validate or transform incoming data             |
| 3        | `ngOnInit()`              | Once after first `ngOnChanges()`                        | Fetch data from API, setup timers, initialize component logic                |
| 4        | `ngDoCheck()`             | On every change detection run                           | Custom change detection logic (e.g., deep comparison of objects)             |
| 5        | `ngAfterContentInit()`    | After content (ng-content) is projected                 | Access projected content (content projection via `<ng-content>`)             |
| 6        | `ngAfterContentChecked()` | After every check of projected content                  | Perform actions after projected content is checked                           |
| 7        | `ngAfterViewInit()`       | After component's view (and child views) is initialized | Access `ViewChild`, `ViewChildren`, setup 3rd party DOM libraries            |
| 8        | `ngAfterViewChecked()`    | After every check of the component's views              | Detect view changes or run logic that depends on the DOM updates             |
| 9        | `afterNextRender()`         | Runs once the next time that all components have been rendered to the DOM. *(Angular 17+)*              
| 10       | `afterEveryRender()`        | Runs every time all components have been rendered to the DOM. *(Angular 17+)*                                                        
| 11       | `ngOnDestroy()`           | Just before Angular destroys the component              | Unsubscribe from observables, clear timers, detach event listeners           |



We can divide the complete Angular life cycle events in to two parts: -

• Sequence of events which occurs when the component is loaded first time.
• sequence of events which fires on every change detection which occurs on the component.

So when the first time component is loaded 
ngOnInit , ngDoCheck ,
ngAfterContentInit , ngAfterContentChecked,
ngAfterViewInit and ngAfterViewChecked.

When component is running on every change the change detection will trigger and 
ngDoCheck ,
ngAfterContentChecked &
ngAfterViewChecked.

Finally when component is removed - ngOnDestroy will be called

1. Constructor: 
    - This is not really an event of angular it’s an event of typescript class. When you create a object of a typescript class constructor fires first. And this will fire irrespective we have angular or not. But still it does have lot of significance as it comes as the first event before any angular component event fires.

2. ngOnChanges: 
    - Called when data bound input property changes. This event is called before ngOnInit().
    - Example: Perform calculations or update internal state when the value of an input property changes.

3. ngOnInit: 
    - Called when first time the data-bound properties are displayed and here we set
        the @Input property values. and do the dom initial state based on the input like hiding showing as per the business needs
    - Example: Fetch initial data from a backend service or set up initial state for the component.

4. ngDoCheck: 
    - Called whenever angular change detection runs.
    - Example: Implement custom change detection logic for performance optimization or to react to changes in state that Angular's default change detection might miss.

5. ngAfterContentInit: 
    Called after Angular projects external content first into the component's view.
    - Example: Access and manipulate the content projected into the component's view, such as querying child components or elements.

6. ngAfterContentChecked: 
    After Angular checks the content projected into the component.
    This is the change detection check for the contents projected.
    Example: Perform additional actions or updates based on changes in the component's content, such as updating UI based on dynamic content changes.

7. ngAfterViewInit: 
    After Angular initializes the component's views, child views and projected content this event fires.
    Example: Access and manipulate DOM elements or child components after they have been rendered in the view.

8. ngAfterViewChecked: 
    Once the default change detection run and content projected change detection run this event fires.
    Example: Perform additional actions or updates based on changes in the component's view, such as updating UI based on dynamic changes in the DOM.

9. ngOnDestroy: 
    This is the clean-up phase just before Angular destroys the directive/component.
    Example: Unsubscribe from observables, cancel timers, release resources, or perform other cleanup tasks to avoid memory leaks or unexpected behavior when the component is destroyed.

10. afterNextRender (SSR) (Angular 16+)
    – executes once and is similar to AfterViewInit but it does not execute in server-side rendering (SSR)

11. afterRender (Angular 16+)
    – executes after every change detection


Once the component is initialized in every change detection below is how the events will fire. If
there are no change to input “ngOnChanges” event will fire.
 ngOnChanges.
 ngDoCheck.
 ngAfterContentChecked.
 ngAfterViewChecked.

Finally when the component is unloaded Destroy event fires.
1. ngOnDestroy: This is the clean-up phase just before Angular destroys the directive/component.

If you see a typical view of Angular it has two parts one is its own HTML/ Content view and the other
is the projected HTML / Content inside ng-content. 

Now whenever events fire they first fire on the
components projected contents and then they fire on the components view.

Also there is one event which fires before them which is like a kick start event to say that both the
events should start processing.
So, there are basically three event sequence: -

• Kick start event :- ngOnInit , ngDoCheck
• After that events fire during content projection ngAfterContentInit , ngAfterContentChecked
• And then on the final view components ngAfterViewInit ,ngAfterViewChecked


 */