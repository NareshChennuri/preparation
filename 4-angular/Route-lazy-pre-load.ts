/** Lazy loading 
 * 
 * 1. The first thing is dividing your project in to modules.
 * 2. Create separate routing files for each module and use “loadChildren” and specify which modules to be loaded on demand.
 * 3. In routing navigation use “forRoot” to load the routes of the main module and “forChild” to load the child modules.
 * 


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
},
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

=================================

/**  Pre Loading 
 * 
 * Lazy loading speeds up our application load time by splitting it into multiple bundles, and loading them on demand. 
 * The issue with lazy loading, of course, is that when the user navigates to the lazy-loadable section of the application, 
 * the router will have to fetch the required modules from the server, which can take time. 
 * To fix this problem we can implement the preloading strategy. 
 * So that, the router can preload lazy-loadable modules in the background while the user is interacting with our application.
 * 

@NgModule({
  bootstrap: [MailAppCmp],
  imports: [RouterModule.forRoot(ROUTES,
    { preloadingStrategy: PreloadAllModules })] /* default preload strategy 
})
class MailModule { }

/** custom preloading strategy 
[
  {
    path: 'moduleA',
    loadChildren: './moduleA.module',
    data: { preload: true }
  },
  {
    path: 'moduleB',
    loadChildren: './moduleB.module'
  }
]

export class PreloadSelectedModulesList implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}

@NgModule({
  bootstrap: [MailAppCmp],
  providers: [CustomPreloadingStrategy],
  imports: [RouterModule.forRoot(ROUTES,
    { preloadingStrategy: CustomPreloadingStrategy })]
})
class MailModule { }


*/