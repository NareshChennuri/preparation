import { Component } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-legacy-redirect',
  template: '',
})
export class LegacyRedirectComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    // Current full URL (path + query + fragment)
    const current = this.router.parseUrl(this.router.url);

    // Primary outlet segments
    const primary = current.root.children['primary'];
    const segments = primary ? [...primary.segments] : [];

    // Remove legacy prefix if present
    const legacyPrefixes = new Set(['academy-tfg-portal', 'innovation-portal']);
    if (segments.length && legacyPrefixes.has(segments[0].path)) {
      segments.shift();
    }

    // Build target URL, keeping query & fragment
    const newTree: UrlTree = this.router.createUrlTree(
      [{ outlets: { primary: segments } }],
      { queryParams: current.queryParams, fragment: current.fragment }
    );

    // Navigate (replace history)
    this.router.navigateByUrl(newTree, { replaceUrl: true });
  }
}
