/* can acitve user guard ------------------------------ 

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