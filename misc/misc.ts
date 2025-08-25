export function legacyPortalStripperMatcher(
  segments: UrlSegment[],
  _group: UrlSegmentGroup,
  _route: Route
): UrlMatchResult | null {
  if (!segments.length) return null;

  const first = segments[0].path;
  // Match if first segment is one of the legacy prefixes
  if (first !== 'academy-tfg-portal' && first !== 'innovation-portal') {
    return null;
  }

  const rest = segments.slice(1).map(s => s.path).join('/');
  return {
    consumed: segments,
    posParams: { rest: new UrlSegment(rest, {}) },
  };
}

const routes: Routes = [
  // --- base redirects & errors
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'internal-server-error', component: InternalServerErrorComponent },

  // --- lifted routes (were under academy-tfg-portal)
  { path: 'home-page', loadChildren: () => import('./features/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'codeathon-homepage', loadChildren: () => import('./features/codeathon/codeathon-homepage/codeathon-homepage.module').then(m => m.CodeathonHomepageModule) },
  { path: 'codeathon', loadChildren: () => import('./features/codeathon/codeathon.module').then(m => m.CodeathonModule) },
  { path: 'codeathon-flow', loadChildren: () => import('./features/codeathon/codeathon-flow/codeathon-flow.module').then(m => m.CodeathonFlowModule) },
  { path: 'learning', loadChildren: () => import('./features/learning/learning.module').then(m => m.LearningModule) },
  { path: 'labappoc', loadChildren: () => import('./features/labappoc/labappoc.module').then(m => m.LabappocModule) },
  { path: 'admin-console', loadChildren: () => import('./features/admin-console/admin-console.module').then(m => m.AdminConsoleModule) },
  { path: 'openShift', loadChildren: () => import('./features/codeathon/codeathon.module').then(m => m.CodeathonModule) },

  // --- cohort redirects
  { path: 'cohort/ctg-signup', redirectTo: 'ctg/signup', pathMatch: 'prefix' },
  { path: 'cohort/event-signup', redirectTo: 'event/signup', pathMatch: 'prefix' },
  { path: 'cohort/tfg-event-report', redirectTo: 'tfg/event-report', pathMatch: 'prefix' },
  { path: 'cohort/ctg-event-signup', redirectTo: 'ctg/event-signup', pathMatch: 'prefix' },
  { path: 'cohort/survey-form', redirectTo: 'tfg/survey-form', pathMatch: 'prefix' },

  // --- legacy redirect matcher (handles both academy-tfg-portal & innovation-portal)
  {
    matcher: legacyPortalStripperMatcher,
    component: LegacyRedirectComponent,
  },

  // --- 404 fallback
  { path: '**', component: NotFoundComponent },
];

@Component({
  selector: 'app-legacy-redirect',
  template: '',
})
export class LegacyRedirectComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    const rest = this.route.snapshot.paramMap.get('rest') ?? '';
    const target = '/' + rest.replace(/^\/+/, '');
    this.router.navigateByUrl(target || '/', { replaceUrl: true });
  }
}
