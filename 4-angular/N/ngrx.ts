/*

Store <--> Selector (getTodo) <--> <Compontents> <--> Action (setTodo) *** Effect <--> Reducer

// in module based
> ng add @ngrx/store
app.module.ts
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/counter.reducer';
@NgModule({
    imports: [BroserModule, StoreModule.forRoot({counter: counterReducer})],
})

// in standalone
> ng add @ngrx/store
main.ts 
import { provideStore } from '@ngrx/store';
import { counterReducer } from './store/counter.reducer';
bootstrapApplication(AppComponent, {
    providers: [provideStore({counter: counterReducer})]
});

NgRx is a state management library for Angular, inspired by Redux. It helps you manage and organize data (state) in your app — especially useful for large applications where many components need to share or update the same data.

Think of it like this:

Imagine your app is like a big classroom.

The Store is like the whiteboard that everyone in the class can see.
If a student (component) wants to change something, they raise their hand (dispatch an Action).
The teacher (a Reducer) sees the action and updates the whiteboard accordingly.
The students (other components) just watch the whiteboard (using Selectors) to see updates and react accordingly.



NgRx Key Concepts in Simple Terms
Concept	Simple Meaning

Store	A single place (like a whiteboard) that holds all your app data
Action	A message saying "I want to do something" (like ADD_TODO)
Reducer	A function that takes the current state + action → returns new state
Selector	A tool to pick specific data from the store (like getTodos)
Effect	Handles side tasks (like API calls) before updating the store

NgRx stores the data in memory, inside the browser's JavaScript runtime — not in local storage, session storage, or a database by default.

It's like a big JavaScript object in RAM, managed by NgRx.

When you create a Store using StoreModule.forRoot(), NgRx sets up a singleton state container.

This container is attached to Angular’s dependency injection system, and stays in memory as long as the app is running.


*/