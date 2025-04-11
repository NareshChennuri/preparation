/*

 1. Project Structure & Architecture

    ✅ Follow feature-based folder structure (/features/login, /features/dashboard) instead of type-based.
    ✅ Use SharedModule and CoreModule:
        SharedModule: for components, pipes, and directives used across the app.
        CoreModule: for singleton services (like AuthService, LoggerService).
    ✅ Split into lazy-loaded feature modules to reduce initial bundle size.

🔹 2. Component Design

    ✅ Follow Smart (container) and Dumb (presentational) component pattern.
    ✅ Keep components small and focused (Single Responsibility Principle).
    ✅ Use @Input() and @Output() for communication instead of accessing child properties directly.
    ✅ Avoid tightly coupling services or logic into UI components.

🔹 3. State Management
    
    ✅ Use RxJS and observables for reactive patterns (e.g., BehaviorSubject, combineLatest).
    ✅ Use NgRx or Signals for complex or global app state.
    ✅ Always unsubscribe using takeUntil, async pipe, or Subscription.unsubscribe() to avoid memory leaks.

🔹 4. Routing Best Practices

    ✅ Define all routes in a dedicated routing module (feature-routing.module.ts).
    ✅ Use lazy loading for large modules.
    ✅ Use route guards (CanActivate, CanDeactivate) for auth and access control.
    ✅ Apply resolver services to load data before route activation.

🔹 5. Performance Optimization

    ✅ Use ChangeDetectionStrategy.OnPush for pure, stateless components.
    ✅ Use trackBy in *ngFor to avoid unnecessary re-renders.
    ✅ Lazy-load images and modules.
    ✅ Avoid logic in templates—move it to the component class.
    ✅ Use pure pipes for performance-critical data transformations.

🔹 6. Code Quality

    ✅ Enforce strict TypeScript settings (strictNullChecks, noImplicitAny).
    ✅ Use linting tools like ESLint and Prettier.
    ✅ Write unit tests for components, services, and pipes using Jasmine + Karma or Jest.
    ✅ Maintain high code coverage and follow the SOLID principles.

🔹 7. Forms
    
    ✅ Prefer Reactive Forms over template-driven for better scalability and control.
    ✅ Use FormBuilder for cleaner syntax.
    ✅ Centralize custom form validators and error messages.
    ✅ Keep form logic out of the HTML view.

🔹 8. Security
    
    ✅ Sanitize dynamic content to prevent XSS.
    ✅ Use DomSanitizer with caution and only when necessary.
    ✅ Implement role-based access on both UI and API.
    ✅ Use HttpInterceptor to add auth tokens and handle 401 globally.

🔹 9. Reusability & Modularity
    
    ✅ Create reusable components, pipes, and directives (ClickOutsideDirective, HighlightPipe).
    ✅ Use Angular Material or PrimeNG with custom themes for UI consistency.
    ✅ Break large components into smaller logical components.

🔹 10. Deployment & Environment
    
    ✅ Use environment.ts files for managing dev, staging, prod settings.
    ✅ Optimize build using ng build --prod or --configuration production.
    ✅ Enable source maps only for non-production builds.
    ✅ Use ngsw (Angular Service Worker) for PWA support if needed.




*/
