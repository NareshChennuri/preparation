/*
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserGuardService } from './Users/user-guard.service';
import { ProductResolverService } from './Products/product-resolver.service';


const arr: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'products',
    resolve: { productData: ProductResolverService },
    canActivate: [UserGuardService],
    children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductAddComponent },
      { path: ':id/edit', component: ProductAddComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(arr);

 Module ------------------------------- 

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
    routing,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

 html nav links ------------------------------------- 

<ul class="navbar-nav mr-auto" >
  <!--[routerLinkActiveOptions]="{ exact : true}" -- >
    <li class="nav-item"[routerLinkActiveOptions] = "{ exact : true}" routerLinkActive = "active" >
      <a class="nav-link" routerLink = "/home" > Home < /a>
        < /li>
        < li class="nav-item"[routerLinkActiveOptions] = "{ exact : true}" routerLinkActive = "active" >
          <a class="nav-link" routerLink = "/products" > Products < /a>
            < /li>
            < li class="nav-item"[routerLinkActiveOptions] = "{ exact : true}" routerLinkActive = "active" >
              <a class="nav-link"[routerLink] = "['/products',0]" > Add Product < /a>
                < /li>

                < /ul>





*/