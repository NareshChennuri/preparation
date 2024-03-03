/*

ngrx is a library for managing state in Angular applications using the Redux pattern. 

- State Management in a centralized manner. 
- like a single immutable data store.

- "Actions" whenever there is a state change angular triggers "Actions"

      import { createAction, props } from '@ngrx/store';

      export const register = createAction('[User] Register', props<{ username: string, password: string }>());
      export const registerSuccess = createAction('[User] Register Success', props<{ user: any }>());
      export const registerFailure = createAction('[User] Register Failure', props<{ error: any }>());

- "Reducers" are pure functions handles the actions and produces a new state based on the previous state

      export const userReducer = createReducer(
        initialState,
        on(UserActions.register, state => ({ ...state, loading: true, error: null })),
        on(UserActions.registerSuccess, (state, { user }) => ({ ...state, user, loading: false })),
        on(UserActions.registerFailure, (state, { error }) => ({ ...state, error, loading: false }))
      );

- "State" holds the application state (single source of truth)

      export interface AppState {
        user: UserState;
      }

- "Selectors" provides a way to access and transform the application state 
   without directly accessing the store.

      export const selectUserState = createFeatureSelector<UserState>('user');

      export const selectUser = createSelector(
        selectUserState,
        state => state.user
      );

      export const selectLoading = createSelector(
        selectUserState,
        state => state.loading
      );

      export const selectError = createSelector(
        selectUserState,
        state => state.error
      );   

Effects: Effects are used for managing side effects such as HTTP requests, timers, or other asynchronous operations. Effects listen for dispatched actions, perform side effects, and dispatch new actions to update the state accordingly.

  @Injectable()
  export class UserEffects {
    register$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.register),
      mergeMap(action => this.authService.register(action.username, action.password).pipe(
        map(user => UserActions.registerSuccess({ user })),
        catchError(error => of(UserActions.registerFailure({ error })))
      ))
    ));

    constructor(private actions$: Actions, private authService: AuthService) {}
  }

Action Creators: Action creators are functions used to create action objects. They encapsulate the logic for constructing action objects with predefined types and payloads, making it easier to dispatch actions from components or services.

  onSubmit() {
    const username = 'exampleUsername'; // Get username from form
    const password = 'examplePassword'; // Get password from form
    this.store.dispatch(register({ username, password }));
  }

Immutable State: ngrx promotes immutable state by enforcing strict rules against direct state mutation. Instead, state changes are achieved by creating new state objects based on the previous state and the action received.

Integration with Angular: ngrx seamlessly integrates with Angular applications, providing decorators, utilities, and best practices for incorporating ngrx into Angular projects.

Overall, ngrx simplifies state management in Angular applications by introducing a clear and structured approach based on the Redux pattern. It enhances application scalability, maintainability, and testability by promoting a single source of truth and predictable data flow.

*/
