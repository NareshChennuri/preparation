/*

- AppModule import RouterModule 
- we need to define the routes using the Routes array.
- Each route path is associated with a component.
- routerLink directive is used for navigation links.
- <router-outlet> in app.component.html is the placeholder where the routed component views will be displayed.


import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserGuardService } from './Users/user-guard.service';
import { ProductResolverService } from './Products/product-resolver.service';

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
  //lazyloading module
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}
//lazyloading component Angular 14+
{
  path: 'help',
  //component: HelpComponent,
  loadComponent: () => import('./help/help.component').then(m => m.HelpComponent)
}
  { path: '**', component: PageNotFoundComponent }
];

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routesList),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

-------------------------------------------------------------------------

<nav>
  <ul>
    <li><a routerLink="/" routerLinkActive="active">Home</a></li>
    <li><a routerLink="/about" routerLinkActive="active">About</a></li>
    <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
  </ul>
</nav>

<router-outlet></router-outlet>  //When the user navigates to a specific route, the associated component renders it within the router-outlet




*/