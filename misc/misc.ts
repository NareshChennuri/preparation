import { UrlSegment, UrlSegmentGroup, UrlMatchResult, Route } from '@angular/router';

export function legacyInnovationPortalMatcher(
  segments: UrlSegment[],
  group: UrlSegmentGroup,
  route: Route
): UrlMatchResult | null {
  if (!segments.length || segments[0].path !== 'innovation-portal') return null;

  return {
    consumed: segments,
    posParams: {
      full: new UrlSegment(segments.map(s => s.path).join('/'), {})
    }
  };
}


import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-legacy-redirect',
  template: ''
})
export class LegacyRedirectComponent {
  constructor(private route: ActivatedRoute, private router: Router) {
    const fullPath = this.route.snapshot.paramMap.get('full') || '';
    const redirected = fullPath.replace(/^innovation-portal/, 'academy-tfg-portal');
    this.router.navigateByUrl('/' + redirected, { replaceUrl: true });
  }
}


// Catch all legacy routes
  {
    matcher: legacyInnovationPortalMatcher,
    component: LegacyRedirectComponent
  },
