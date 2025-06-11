import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-legacy-redirect',
  template: ''
})
export class LegacyRedirectComponent {
  constructor(private route: ActivatedRoute, private router: Router) {
    const fullUrl = this.route.snapshot.url.map(segment => segment.path);
    const newUrl = ['academy-tfg-portal', ...fullUrl.slice(1)];
    this.router.navigate(['/', ...newUrl], { replaceUrl: true });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    LegacyRedirectComponent // 👈 Add this
  ],
  ...
})


import { LegacyRedirectComponent } from './legacy-redirect.component';

const routes: Routes = [
  { path: '', redirectTo: '/academy-tfg-portal/home-page', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Catch-all for old innovation-portal URLs
  { path: 'innovation-portal/**', component: LegacyRedirectComponent },

  {
    path: 'academy-tfg-portal',
    children: [
      { path: '', redirectTo: 'home-page', pathMatch: 'prefix' },
      { path: 'homepage', redirectTo: 'home-page', pathMatch: 'prefix' },
      { path: 'home-page', loadChildren: './features/home-page/home-page.module#HomePageModule' },
      { path: 'homelabs', loadChildren: './features/codeathon-homepage/codeathon-homepage.module#CodeathonHomepageModule' },
      { path: 'codeathon', loadChildren: './features/codeathon/codeathon.module#CodeathonModule' },
      { path: 'learnings', loadChildren: './features/learnings/learnings.module#LearningsModule' },
      { path: 'codeathon-flow', loadChildren: './features/codeathonflow/codeathonflow.module#CodeathonFlowModule' },
      { path: 'labgampoc', loadChildren: './features/labgampoc/labgampoc.module#LabgampocModule' },
      { path: 'gitlab', loadChildren: './features/labgampoc/labgampoc.module#LabgampocModule' },
      { path: 'admin-console', loadChildren: './features/admin-console/admin-console.module#AdminConsoleModule' },
      { path: 'openshiftlab', loadChildren: './features/open-shift-lab/open-shift-lab.module#OpenShiftLabModule' },
      { path: 'tfg', loadChildren: './features/codeathon/codeathon.module#CodeathonModule' },

      // Cohort redirects
      { path: 'cohort/cohort-createevent', redirectTo: 'tfg/create-event', pathMatch: 'prefix' },
      { path: 'cohort/cohort-signup', redirectTo: 'tfg/signup', pathMatch: 'prefix' },
      { path: 'cohort/tfg-signup', redirectTo: 'tfg/signup', pathMatch: 'prefix' },
      { path: 'cohort/tfg-events-calendar', redirectTo: 'tfg/events-calendar', pathMatch: 'prefix' },
      { path: 'cohort/manage-tfg-event', redirectTo: 'tfg/manage-events', pathMatch: 'prefix' },
      { path: 'cohort/tfg-event-report', redirectTo: 'tfg/event-report', pathMatch: 'prefix' },
      { path: 'cohort/cohort-facilitator-signup', redirectTo: 'tfg/global-tfg-leadership', pathMatch: 'prefix' },
      { path: 'cohort/survey-form', redirectTo: 'tfg/survey-form', pathMatch: 'prefix' },
    ]
  },

  { path: '**', component: NotFoundComponent }
];
