import { UrlSegment, Route, UrlSegmentGroup, UrlMatchResult } from '@angular/router';


export function innovationRedirectMatcher(
  segments: UrlSegment[],
  group: UrlSegmentGroup,
  route: Route
): UrlMatchResult | null {
  if (!segments.length || segments[0].path !== 'innovation-portal') {
    return null;
  }

  // Remove the old base path
  const newSegments = segments.slice(1); // everything after 'innovation-portal'
  return {
    consumed: segments,
    posParams: {
      path: new UrlSegment(newSegments.map(s => s.path).join('/'), {})
    }
  };
}


{
  matcher: innovationRedirectMatcher,
  redirectTo: (route) => {
    const path = route.posParams?.['path']?.path || '';
    return `/academy-tfg-portal/${path}`;
  }
}
