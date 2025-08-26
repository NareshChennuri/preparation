import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legacy-redirect',
  template: '',
})
export class LegacyRedirectComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    // Full URL string including query + fragment
    const currentUrl = this.router.url;

    // Strip leading prefixes
    let newUrl = currentUrl
      .replace(/^\/academy-tfg-portal/, '')
      .replace(/^\/innovation-portal/, '');

    // If nothing left (just prefix), go to root
    if (!newUrl || newUrl === '/') {
      newUrl = '/';
    }

    // Navigate as plain string (avoids Angular treating it as matrix params)
    this.router.navigateByUrl(newUrl, { replaceUrl: true });
  }
}
