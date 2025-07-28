/*

| API                         | Description                                                    | Example                                      |
| --------------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| `signal()`                  | Creates a writable signal                                      | `count = signal(0);`                         |
| `computed()`                | Creates a derived signal from other signals                    | `double = computed(() => count() * 2);`      |
| `effect()`                  | Reacts to signal changes with side effects                     | `effect(() => console.log(count()));`        |
| `input()`                   | Bind reactive inputs (experimental, Angular 17+)               | `@Input() title = input<string>();`          |
| `set(value)` / `update(fn)` | Updates signal values                                          | `count.set(5)` or `count.update(c => c + 1)` |
| `peek()`                    | Reads signal without registering dependency (used in `effect`) | `count.peek()`                               |


| Use Case                   | How Signals Help                                 |
| -------------------------- | ------------------------------------------------ |
| Component State Management | Replace `BehaviorSubject`, `Input` bindings      |
| Derived Values             | Use `computed()` instead of manual recalculation |
| Local Change Detection     | Auto-updates DOM without `markForCheck()`        |
| Side Effects               | Use `effect()` instead of `subscribe()`          |
| Form State & UI Sync       | Use signals for reactive form state              |


Added as 'Developer Preview' in v16 stable in v17
- No automatic change detection 
- you tell anuglar when data changes
- angular updates only the parts of the UI where the data is used.

Slightly more work
But full control, better performance & smaller bundle size.

import { signal, computed, effect } from '@angular/core';

const counter = signal(0); // Create a signal
counter.set(1); // Set the value
// also you can set the value by update()
counter.update((oldCounter) => oldCounter + 1); // update value

// Computed signals
const double = computed(() => counter() * 2);
console.log(double()); // 2

// Effects: Run side-effects when signals change
effect(() => {
  console.log('Counter changed:', counter());
});
counter.set(5); // This triggers the effect



"Signals are a new way in Angular to manage and react to data changes.
Instead of Angular checking the whole app for changes all the time, a signal acts like a special variable that lets Angular know exactly when and where to update the screen—only for the parts that depend on that signal.
This makes the app faster and more efficient, especially as it gets bigger."

Analogy
"Think of a signal like a smart doorbell.
Whenever someone presses the button, only the people who care about that doorbell get notified.
In the past, Angular would ring every bell in the whole building just in case.
With signals, only the right doors get notified when something changes."

Even Shorter Version
"Signals help Angular apps update only what’s needed, when it’s needed—making them much faster and easier to manage."

Optional (for bonus points!):
"They’re similar to reactive variables. When you change a signal’s value, the UI or any code that uses that signal updates automatically, without scanning everything else in the app."


----------------------

Signals are a new, fine-grained reactivity system in Angular (introduced in v16+).

They are a way to store values that change over time, and automatically update anything that depends on them.

Think of them as “reactive variables”—when the value changes, Angular knows exactly what needs to re-render.

Why Did Angular Add Signals?
Traditional Angular uses “zone-based” change detection, which can be inefficient because it checks all components on almost any event.

Signals allow for much more efficient, targeted updates—only code that depends on a changed signal will re-run.

This is similar to how frameworks like SolidJS and Svelte handle reactivity.

How Do Signals Work?
You create a signal to hold a value.

You read a signal’s value inside a template or function.

If you change (set) a signal, any code or template using that signal will automatically update.

Basic Example
------------------------------------------------
import { signal, computed, effect } from '@angular/core';

// Create a signal
const counter = signal(0);

// Read the value
console.log(counter()); // 0

// Set the value
counter.set(1);
console.log(counter()); // 1

// Computed signals
const double = computed(() => counter() * 2);
console.log(double()); // 2

// Effects: Run side-effects when signals change
effect(() => {
  console.log('Counter changed:', counter());
});
counter.set(5); // This triggers the effect

Using Signals in Angular Components
---------------------------------------
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>Counter: {{ count() }}</p>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }
}

The template automatically updates when count changes, without running change detection everywhere.

Key Features & Benefits
Fine-grained reactivity: Only what needs to update, updates.

No zones required: Signals can work without Zone.js (good for performance).

Composability: Combine, transform, and react to signals with computed and effect.

Easier reasoning: Clear data flow and dependencies.

When to Use Signals?
For local component state that changes often.

For reactive computations or derived values.

For efficient UI updates—especially in large, complex UIs.

Summary Table
Feature	Signals	Traditional Angular State
Reactivity	Fine-grained (exact updates)	Coarse-grained (global checks)
Setup	signal(), computed(), etc.	Services, RxJS, inputs, etc.
Performance	Higher (less change detection)	Can be lower (zone checks)
Zone.js needed?	No	Yes (usually)
Syntax	Simple, direct	Often needs RxJS or services

In short:
Signals are Angular’s new way to make your apps reactive, efficient, and easy to maintain. They’re simple, powerful, and will likely become the standard for Angular state management.



*/