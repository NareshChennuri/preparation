/*

ngrx is a library for managing state in Angular applications using the Redux pattern. 

- State Management in a centralized manner. 
- like a single immutable data store.
- "Actions" whenever there is a state change angular triggers "Actions"
- "Reducers" are pure functions handles the actios and produces a new state based on the previous state
- "Store" holds the application state (single source of truth)
- "Selectors" provides a way to access and transform the application state 
  without directly accessing the store.

Effects: Effects are used for managing side effects such as HTTP requests, timers, or other asynchronous operations. Effects listen for dispatched actions, perform side effects, and dispatch new actions to update the state accordingly.

Action Creators: Action creators are functions used to create action objects. They encapsulate the logic for constructing action objects with predefined types and payloads, making it easier to dispatch actions from components or services.

Immutable State: ngrx promotes immutable state by enforcing strict rules against direct state mutation. Instead, state changes are achieved by creating new state objects based on the previous state and the action received.

Integration with Angular: ngrx seamlessly integrates with Angular applications, providing decorators, utilities, and best practices for incorporating ngrx into Angular projects.

Overall, ngrx simplifies state management in Angular applications by introducing a clear and structured approach based on the Redux pattern. It enhances application scalability, maintainability, and testability by promoting a single source of truth and predictable data flow.

*/
