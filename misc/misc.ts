import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'academy-resources', loadChildren: () => import('./features/academy-resources/academy-resources.module').then(m => m.AcademyResourcesModule) },
  { path: 'technology-focus-group', loadChildren: () => import('./features/technology-focus-group/technology-focus-group.module').then(m => m.TechnologyFocusGroupModule) },
  { path: 'global-technology-lab', loadChildren: () => import('./features/global-technology-lab/global-technology-lab.module').then(m => m.GlobalTechnologyLabModule) },
  { path: 'admin-console', loadChildren: () => import('./features/admin-console/admin-console.module').then(m => m.AdminConsoleModule) },
  { path: '**', redirectTo: 'auth' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
