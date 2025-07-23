/**

"Angular lifecycle hooks are methods that give you control over key moments in a component 
or directive’s existence — like creation, updates, and destruction. 
They allow us to run logic at specific stages."

Constructor → ngOnChanges (if @input) → ngOnInit → ngDoCheck → 
ngAfterContentInit (if ng-content) → ngAfterContentChecked (if ng-content) →
ngAfterViewInit → ngAfterViewChecked →
ngOnDestroy


Angular Hook	What it means
ngOnInit()	Called once, right after component is created and inputs are set
ngOnChanges()	Called whenever an @Input() value changes
ngDoCheck()	Called on every change detection (custom checks)
ngAfterViewInit()	Called after component's view (HTML) is ready
ngAfterViewChecked()	Called every time the view is checked/updated
ngAfterContentInit()	Called when projected content (<ng-content>) is ready
ngAfterContentChecked()	Called when projected content is checked
ngOnDestroy()	Called right before component is destroyed (cleanup goes here)


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
| 9        | `ngOnDestroy()`           | Just before Angular destroys the component              | Unsubscribe from observables, clear timers, detach event listeners           |



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