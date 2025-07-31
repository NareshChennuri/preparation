// auth.model.ts
export interface User {
  id: string;
  name: string;
  token: string;
  roles: string[];
}

export interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

// auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from './auth.model';

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.model';

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

// auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAuthUser = createSelector(selectAuthState, state => state.user);
export const selectAuthError = createSelector(selectAuthState, state => state.error);
export const selectAuthLoading = createSelector(selectAuthState, state => state.loading);

// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) => {
        if (username === 'admin' && password === 'admin') {
          const user = {
            id: '1',
            name: 'Admin',
            token: 'abc123',
            roles: ['admin', 'user']
          };
          return of(AuthActions.loginSuccess({ user }));
        } else {
          return of(AuthActions.loginFailure({ error: 'Invalid credentials' }));
        }
      })
    )
  );
}

// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectAuthUser } from './store/auth.selectors';

export function authGuard(requiredRoles: string[] = []): CanActivateFn {
  return () => {
    const store = inject(Store);
    return store.select(selectAuthUser).pipe(
      take(1),
      map(user => {
        if (!user) return false;
        if (requiredRoles.length === 0) return true;
        return requiredRoles.some(role => user.roles.includes(role));
      })
    );
  };
}

// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';
import { selectAuthUser, selectAuthError, selectAuthLoading } from './store/auth.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2>Login</h2>
    <input [(ngModel)]="username" placeholder="Username" />
    <input [(ngModel)]="password" placeholder="Password" type="password" />
    <button (click)="onLogin()" [disabled]="(loading$ | async)">Login</button>

    <p *ngIf="error$ | async as error" style="color: red">{{ error }}</p>
    <p *ngIf="user$ | async as user" style="color: green">Welcome {{ user.name }}</p>

    <a routerLink="/admin">Go to Admin Page</a>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  user$ = this.store.select(selectAuthUser);
  error$ = this.store.select(selectAuthError);
  loading$ = this.store.select(selectAuthLoading);

  constructor(private store: Store) {}

  onLogin() {
    this.store.dispatch(AuthActions.login({ username: this.username, password: this.password }));
  }
}

// admin.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule],
  template: `<h2>Welcome Admin</h2><p>You are in a protected route.</p>`
})
export class AdminComponent {}

// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {}

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './app/store/auth.reducer';
import { AuthEffects } from './app/store/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/login.component';
import { AdminComponent } from './app/admin.component';
import { authGuard } from './app/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard(['admin'])] }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
});
