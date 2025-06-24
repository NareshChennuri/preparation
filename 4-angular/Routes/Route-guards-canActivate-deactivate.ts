/* can acitve user guard ------------------------------ 

const routesList: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'products',
    resolve: { productData: ProductResolverService },
    canActivate: [UserGuardService], // can activate route guard
    children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductAddComponent },
      { path: ':id/edit', component: ProductAddComponent }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // lazy loading
  },
  { path: '**', component: PageNotFoundComponent }
];

Angular, guards are used to control navigation either by allowing or denying access to certain routes. 
There are several types of guards available, including CanActivate, CanActivateChild, and CanDeactivate.

CanActivate Guard: (decides whether a route can be activated or not)
  - If it returns true, navigation is allowed; 
  - if it returns false, navigation is blocked.

CanDeactivate Guard: (decides whether a route can be deactivated or not)
  - it is used to ask the user if they want to leave the current route. 
  - If it returns true, navigation is allowed; 
  - if it returns false, navigation is blocked.

CanActivateChild Guard: (decides whether the child routes of a particular route can be activated or not)
  - This guard is similar to CanActivate 
  - but is specifically applied to child routes.

canLoad: (whether a lazy-loaded module should be loaded or not)
  - Applied only to lazy-loaded routes.
  - Controls access to entire lazy-loaded modules.
  - Executed before the lazy-loaded module is loaded.
  - Returns true to allow loading of the module, false to prevent loading.



  Here's a brief example of how these guards can be implemented:


import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Your authentication logic goes here
    return true; // Example: always allow access for demonstration purposes
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Your authentication logic for child routes goes here
    return true; // Example: always allow access for demonstration purposes
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmLeaveGuard implements CanDeactivate<any> {
  canDeactivate(component: any): Observable<boolean> | Promise<boolean> | boolean {
    // Your logic to confirm leaving the current route goes here
    return confirm('Are you sure you want to leave?');
  }
}

In this example:

AuthGuard implements both CanActivate and CanActivateChild. It returns true for demonstration purposes, but you would typically include authentication logic to determine whether to allow navigation.

ConfirmLeaveGuard implements CanDeactivate and provides a confirmation dialog asking the user if they are sure they want to leave the current route.

These guards can then be applied to specific routes in your Angular application's routing configuration. For instance:


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { AuthGuard } from './auth.guard';
import { ConfirmLeaveGuard } from './confirm-leave.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard], canDeactivate: [ConfirmLeaveGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
In this routing configuration:

AuthGuard is applied to the home route ('') and the about route ('about') using the canActivate property.
ConfirmLeaveGuard is applied to the about route ('about') using the canDeactivate property.





import {
    CanActivate, CanLoad, Router,
    RouterStateSnapshot, ActivatedRouteSnapshot, Route
  } from '@angular/router';
  
  import { UserAuthService } from './user-auth.service';
  
  @Injectable({
    providedIn: 'root'
  })
  export class UserGuardService implements CanActivate, CanLoad {
  
    constructor(private _user_auth: UserAuthService, private _router: Router) { }
  
    canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
      if (this._user_auth.isLoggedIn) {
        return true;
      }
      this._user_auth.redirectURL = url;
      this._router.navigate(['/login']);
      return false;
    }
    canLoad(_route: Route): boolean {
      if (this._user_auth.isLoggedIn) {
        return true;
      }
      this._user_auth.redirectURL = url;
      this._router.navigate(['/login']);
      return false;
  
    }
  }

  */