/*

how Angular's change detection works:

- Angular uses Javascript feature called Zones
    Zones monitor asynchronous operations like setTimeout, setInterval, XMLHttpRequest & event listeners
    and triggers Change detection

- Change Detection Strategy:
    Angular provides two change detection strategies 
    - Default (on every change detection cycle angular checks the entire component tree)
    - OnPush (only checks a component for changes if its input properties have changed or event emitted)
        this will reduce change detection overhead.

- Marking Components for Check: ( ChangeDetectorRef.markForCheck() )
    explicitly using the ChangeDetectorRef.markForCheck() method. 
    This method marks the component and its ancestors for change detection, 
    ensuring that they are checked during the next change detection cycle.

6. Change Detection Events: ( ChangeDetectorRef.detectChanges() )
    You can also manually trigger change detection by ChangeDetectorRef.detectChanges() method. 
    This method forces Angular to immediately check and update the component tree, bypassing the normal change detection cycle.

7. Performance Optimization:
    by using OnPush change detection strategy we can optimize performance, minimize the number of change detection cycles.
    Avoid triggering change detection unnecessarily and optimize complex bindings or computations to reduce the overhead of change detection.

*/
