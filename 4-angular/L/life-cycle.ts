/**
 * 
 
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

1. Constructor: - This is not really an event of angular it’s an event of typescript class. When
you create a object of a typescript class constructor fires first. And this will fire irrespective
we have angular or not. But still it does have lot of significance as it comes as the first event
before any angular component event fires.

2. ngOnChanges: Called when data bound input property changes. This event is called before
ngOnInit().

3. ngOnInit: Called when first time the data-bound properties are displayed and here we set
the @Input property values. and do the dom initial state based on the input like hiding showing as per the business needs

4. ngDoCheck: Called whenever angular change detection runs.

5. ngAfterContentInit: Called after Angular projects external content first into the component's
view.

6. ngAfterContentChecked: After Angular checks the content projected into the component.
This is the change detection check for the contents projected.

7. ngAfterViewInit: After Angular initializes the component's views, child views and projected
content this event fires.

8. ngAfterViewChecked: Once the default change detection run and content projected change
detection run this event fires.

Once the component is initialized in every change detection below is how the events will fire. If
there are no change to input “ngOnChanges” event will fire.
9. ngOnChanges.
10. ngDoCheck.
11. ngAfterContentChecked.
12. ngAfterViewChecked.

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