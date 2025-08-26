// legacy-redirect.component.ts
import { Component, inject } from '@angular/core';
import { Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';

@Component({
  selector: 'app-legacy-redirect',
  template: '',
})
export class LegacyRedirectComponent {
  private router = inject(Router);

  ngOnInit() {
    // Current full URL (path + query + fragment)
    const current = this.router.parseUrl(this.router.url);

    // Extract primary path segments
    const primary = current.root.children['primary'];
    const segments = primary ? [...primary.segments] : [];

    // Strip the first segment if it's a legacy prefix
    const legacy = ['academy-tfg-portal', 'innovation-portal'];
    if (segments.length && legacy.includes(segments[0].path)) {
      segments.shift();
    }

    // Build a new UrlTree with the remaining segments, but KEEP query/fragment
    const newTree: UrlTree = this.router.createUrlTree(
      [{ outlets: { primary: segments } }],
      { queryParams: current.queryParams, fragment: current.fragment }
    );

    // Replace history so the old URL doesn’t linger
    this.router.navigateByUrl(newTree, { replaceUrl: true });
  }
}



// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LegacyRedirectComponent } from './legacy-redirect.component';

const routes: Routes = [
  // base
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'internal-server-error', component: InternalServerErrorComponent },

  // lifted children (were under academy-tfg-portal)
  {
    path: 'home-page',
    loadChildren: () =>
      import('./features/home-page/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: 'codeathon-homepage',
    loadChildren: () =>
      import('./features/codeathon/codeathon-homepage/codeathon-homepage.module')
        .then(m => m.CodeathonHomepageModule),
  },
  {
    path: 'codeathon',
    loadChildren: () =>
      import('./features/codeathon/codeathon.module').then(m => m.CodeathonModule),
  },
  {
    path: 'codeathon-flow',
    loadChildren: () =>
      import('./features/codeathon/codeathon-flow/codeathon-flow.module')
        .then(m => m.CodeathonFlowModule),
  },
  {
    path: 'learning',
    loadChildren: () =>
      import('./features/learning/learning.module').then(m => m.LearningModule),
  },
  {
    path: 'labappoc',
    loadChildren: () =>
      import('./features/labappoc/labappoc.module').then(m => m.LabappocModule),
  },
  {
    path: 'admin-console',
    loadChildren: () =>
      import('./features/admin-console/admin-console.module')
        .then(m => m.AdminConsoleModule),
  },
  {
    path: 'openShift',
    loadChildren: () =>
      import('./features/codeathon/codeathon.module').then(m => m.CodeathonModule),
  },

  // cohort redirects (as in your file)
  { path: 'cohort/ctg-signup', redirectTo: 'ctg/signup', pathMatch: 'prefix' },
  { path: 'cohort/event-signup', redirectTo: 'event/signup', pathMatch: 'prefix' },
  { path: 'cohort/tfg-event-report', redirectTo: 'tfg/event-report', pathMatch: 'prefix' },
  { path: 'cohort/ctg-event-signup', redirectTo: 'ctg/event-signup', pathMatch: 'prefix' },
  { path: 'cohort/survey-form', redirectTo: 'tfg/survey-form', pathMatch: 'prefix' },

  // --- legacy prefixes: redirect everything under them ---
  {
    path: 'academy-tfg-portal',
    children: [{ path: '**', component: LegacyRedirectComponent }],
  },
  {
    path: 'innovation-portal',
    children: [{ path: '**', component: LegacyRedirectComponent }],
  },

  // 404
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
