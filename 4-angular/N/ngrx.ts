/*

### NgRx Interview Questions and Answers

**1. What is NgRx?**
NgRx is a reactive state management library for Angular based on Redux principles. It uses RxJS to manage and react to state changes using actions, reducers, selectors, and effects.

**2. What are the commonly used NgRx libraries?**

* `@ngrx/store`: Main state management
* `@ngrx/effects`: Handle side effects (like API calls)
* `@ngrx/entity`: Manage collections of entities
* `@ngrx/store-devtools`: Debug/store inspection
* `@ngrx/router-store`: Sync Angular Router with Store
* `@ngrx/component-store`: Localized state management

**3. What is Redux?**
Redux is a predictable state container for JavaScript apps. It uses a single immutable store and state is updated via pure reducers in response to dispatched actions.

**4. Use of NgRx?**

* Centralized, predictable state management
* Reactive data flow
* Side-effect handling (API, logging)
* Time-travel debugging

**5. State in Angular?**
State refers to the application's current data (UI, user, etc). Can be local (component) or shared (global services or NgRx).

**6. Can we have multiple states in NgRx?**
Yes. You can define multiple feature states, each with its own reducer.

**7. What is an Action in NgRx?**
An action is a plain object that describes an event or change that should occur in the app's state.

**8. How to dispatch an Action?**
Using the `store.dispatch` method:

```ts
this.store.dispatch(login({ username, password }));
```

**9. How to pass parameters in Action?**
Using `props` in `createAction`:

```ts
export const login = createAction('[Auth] Login', props<{ username: string, password: string }>());
```

**10. What is a Reducer?**
A pure function that takes the current state and an action, and returns a new state.

**11. Action vs Reducer in NgRx**

* **Action**: Describes *what happened*.
* **Reducer**: Describes *how state changes* based on action.

**12. What is a Selector?**
A function that extracts a slice of state for use in components.

**13. What is createFeatureSelector?**
Creates a selector for a specific feature state:

```ts
const selectAuthState = createFeatureSelector<AuthState>('auth');
```

**14. What is an Effect?**
A class that listens for specific actions and performs side-effects (API calls, routing), then dispatches new actions.

**15. Purpose of Entity Adapters in NgRx?**

* Simplify state management of collections (add, remove, update)
* Normalized state structure

**16. What is STORE-devtools?**
Tool to debug NgRx store using Redux DevTools browser extension. Supports time-travel and state inspection.

**17. Differences: @ngrx/store vs @ngrx/effects vs @ngrx/entity**

* `@ngrx/store`: Store and state updates
* `@ngrx/effects`: Handle side-effects
* `@ngrx/entity`: Manage normalized entity collections

**18. Why use NgRx instead of services/Subjects?**

* Predictable, testable state
* Centralized control of business logic
* Time-travel/debugging
* Scalable for large apps

**19. Real-world use cases for NgRx**

* Auth state (login/logout)
* Shopping cart
* Role-based UI
* Data caching
* Global error/loading state

**20. How to use NgRx in Angular 17?**

* Install NgRx packages
* Provide store and effects in `main.ts`:

```ts
provideStore({ auth: authReducer })
provideEffects([AuthEffects])
```

* Use `inject(Store)` or constructor injection in standalone components.
* Works without `NgModules` via standalone APIs.


*/