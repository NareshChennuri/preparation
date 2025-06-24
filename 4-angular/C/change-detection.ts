/*

Change Detection 
- is a mechanism by which Angular keeps the UI in sync with the application's data model.
- Angular follows a tree-like structure, starting from the root component and traversing down to the child components. 
  Angular checks for changes in the component's properties and the properties of its child components.

how Angular's change detection works:

- Angular uses Javascript feature called Zones
    Zones monitor asynchronous operations like setTimeout, setInterval, XMLHttpRequest & event listeners
    and triggers Change detection

- Change Detection Strategy:
    Angular provides two change detection strategies 
    - Default (on every change detection cycle angular checks the entire component tree)
    - OnPush (only checks a component for changes if its input properties have changed or event emitted)
        this will reduce change detection overhead.
        
        changeDetection: ChangeDetectionStrategy.OnPush

- Marking Components for Check: ( ChangeDetectorRef.markForCheck() ) //marking Darty
    explicitly using the ChangeDetectorRef.markForCheck() method. 
    This method marks the component and its ancestors for change detection, 
    ensuring that they are checked during the next change detection cycle.

6. Change Detection Events: ( ChangeDetectorRef.detectChanges() )
    You can also manually trigger change detection by ChangeDetectorRef.detectChanges() method. 
    This method forces Angular to immediately check and update the component tree, bypassing the normal change detection cycle.

7. Performance Optimization:
    by using OnPush change detection strategy we can optimize performance, minimize the number of change detection cycles.
    Avoid triggering change detection unnecessarily and optimize complex bindings or computations to reduce the overhead of change detection.


If you use OnPush, update objects by replacing them, not mutating them.

If you use Default, Angular will catch both mutations and replacements, but at a performance cost.

When to pick each:
Use OnPush: When you want your components to be efficient, only re-rendering when inputs actually change.

Use Default: When you want a "just works" approach and don't want to worry about immutability or when legacy code mutates objects directly.    


-- If you use OnPush, update objects by replacing them, not mutating them.
-- If you use Default, Angular will catch both mutations and replacements, but at a performance cost.

When to pick each:
Use OnPush: When you want your components to be efficient, only re-rendering when inputs actually change.
Use Default: When you want a "just works" approach and don't want to worry about immutability or when legacy code mutates objects directly.

==========================================

Example Scenario
Suppose you have a UserListComponent that displays a list of users. It receives the user list from its parent via @Input().

Case 1: Using OnPush with Immutable Updates

@Component({
  selector: 'user-list',
  template: `
    <ul>
      <li *ngFor="let user of users">{{ user.name }}</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  @Input() users: User[];
}
Parent Component:

typescript
Copy
Edit
// To add a user:
this.users = [...this.users, newUser]; // <--- New array reference

// To remove a user:
this.users = this.users.filter(u => u.id !== userId); // <--- New array reference
Why this works:

OnPush detects changes only if the users input reference changes.

By creating a new array (...this.users), Angular sees the input as new and updates the view.

Case 2: Using Default with Mutable Updates

@Component({
  selector: 'user-list',
  template: `
    <ul>
      <li *ngFor="let user of users">{{ user.name }}</li>
    </ul>
  `
  // No OnPush, so default
})
export class UserListComponent {
  @Input() users: User[];
}
Parent Component:

typescript
Copy
Edit
// To add a user:
this.users.push(newUser); // <--- Mutating the existing array

// To remove a user:
this.users.splice(index, 1); // <--- Mutating the existing array
Why this works:

With Default change detection, Angular checks all the time—even if the object reference doesn’t change.

The view updates because Angular keeps running change detection on every event, so even mutated data gets picked up.

*/