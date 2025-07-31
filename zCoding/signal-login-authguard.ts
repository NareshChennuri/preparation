// user.model.ts
export interface User {
  id: string;
  name: string;
  token: string;
  roles: string[];
}

// auth.service.ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);
  private _error = signal<string | null>(null);
  private _loading = signal(false);

  readonly user = this._user.asReadonly();
  readonly error = this._error.asReadonly();
  readonly loading = this._loading.asReadonly();

  constructor(private router: Router) {}

  login(username: string, password: string) {
    this._loading.set(true);
    this._error.set(null);

    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        const user: User = {
          id: '1',
          name: 'Admin',
          token: 'abc123',
          roles: ['admin', 'user']
        };
        this._user.set(user);
        this._loading.set(false);
        this.router.navigate(['/admin']);
      } else {
        this._error.set('Invalid credentials');
        this._loading.set(false);
      }
    }, 1000);
  }

  logout() {
    this._user.set(null);
    this.router.navigate(['/']);
  }
}

// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export function authGuard(requiredRoles: string[] = []): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const user = auth.user();
    if (!user) return false;
    if (requiredRoles.length === 0) return true;
    return requiredRoles.some(role => user.roles.includes(role));
  };
}

// login.component.ts
import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2>Login</h2>
    <input [(ngModel)]="username" placeholder="Username" />
    <input [(ngModel)]="password" placeholder="Password" type="password" />
    <button (click)="onLogin()" [disabled]="auth.loading()">Login</button>

    <p *ngIf="auth.error() as error" style="color: red">{{ error }}</p>
    <p *ngIf="auth.user() as user" style="color: green">Welcome {{ user.name }}</p>

    <a routerLink="/admin">Go to Admin Page</a>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(public auth: AuthService) {}

  onLogin() {
    this.auth.login(this.username, this.password);
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
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/login.component';
import { AdminComponent } from './app/admin.component';
import { authGuard } from './app/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard(['admin'])] }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
