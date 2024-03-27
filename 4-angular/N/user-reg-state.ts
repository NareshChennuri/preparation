//================================================================================================
// user.model.ts
export interface User {
    id: number; // or whatever type your user id is
    username: string;
    email: string;
    password: string;
    // Add any other properties relevant to your user model
  }

//================================================================================================
//Define Actions: Define actions to represent different stages of the registration process.
// user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

// Action to trigger user registration
export const registerUser = createAction(
  '[User] Register User',
  props<{ user: User }>()
);

// Action to indicate successful registration
export const registerUserSuccess = createAction(
  '[User] Register User Success',
  props<{ user: User }>()
);

// Action to handle registration failure
export const registerUserFailure = createAction(
  '[User] Register User Failure',
  props<{ error: any }>()
);

//================================================================================================
// Define Reducer: Define a reducer to handle state changes based on the dispatched actions.
// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.registerUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.registerUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),
  on(UserActions.registerUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

//================================================================================================
// Define Effects: Define effects to handle asynchronous actions like API calls.
// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from './user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerUser),
      mergeMap(action =>
        this.userService.registerUser(action.user).pipe(
          map(user => UserActions.registerUserSuccess({ user })),
          catchError(error => of(UserActions.registerUserFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}

//================================================================================================
// Define Service: Implement a service to interact with the backend API for user registration.
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://your-api-url';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }
}

//================================================================================================
// Module Setup: Register the reducer, effects, and service in the Angular module.
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './user.reducer';
import { UserEffects } from './user.effects';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects])
  ],
  declarations: [],
  bootstrap: [],
  providers: []
})
export class AppModule {}