/*


Navigation bar routes ("this.router.config" will give you all the routes)
<app-navigation-bar></app-navigation-bar>
===========================================================================

To display all routes in the navigation bar in an Angular application, you'll need to follow these steps:

Define Routes:
--------------------
Define routes in your Angular application using the Angular Router. You can do this in the app-routing.module.ts file or any custom routing module.

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  // Define other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

Access Routes in Component:
------------------------------------
Inject the Router service into the component where you want to display the navigation bar.

import { Router } from '@angular/router';

constructor(private router: Router) { }

Fetch Routes:
----------------
Use the router.config property to get the list of defined routes.

routes: any[];

ngOnInit(): void {
  this.routes = this.router.config.filter(route => route.path !== '');
}

Display Routes in Navigation Bar:
---------------------------------
Use Angular directives like ngFor to iterate over the routes and display them in the navigation bar.
html
Copy code
<ul>
  <li *ngFor="let route of routes">
    <a [routerLink]="[route.path]">{{ route.path }}</a>
  </li>
</ul>

Style Navigation Bar (Optional):
--------------------------------------
Apply CSS styles to the navigation bar to make it visually appealing and ensure it fits the design of your application.

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline;
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: #333;
}

a:hover {
  color: #555;
}

Include Navigation Bar Component:

Include the navigation bar component in the layout or any other component where you want to display the routes.

<app-navigation-bar></app-navigation-bar>

*/