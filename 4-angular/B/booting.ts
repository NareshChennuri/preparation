/* 

🚀 Standalone Bootstrap (bootstrapApplication)

Entry Point:
Use main.ts with bootstrapApplication(AppComponent, { providers: [...] }).

Root Injector Creation:
Directly builds the root DI container from the provided providers (provideRouter, provideHttpClient, interceptors, etc.).

No AppModule:
Everything is configured via standalone components and provider functions—simplifies DI graph and improves tree-shaking.

APP_INITIALIZER Execution:
Runs initializers (e.g., remote config fetch) before the root component is rendered.

Root Component Mounting:
Creates AppComponent, attaches it to <app-root> (or any host element), and runs lifecycle hooks.

Router Integration:
If provideRouter() is added, initial navigation is performed during bootstrap.

SSR Hydration:
Supports hydration with provideClientHydration() to re-use server-rendered DOM.

Performance Tuning:
Add provideZoneChangeDetection({ eventCoalescing:true, runCoalescing:true }) or enable zoneless mode.

------------------------------------------------------------------------------------------------------------------

📦 Module-Based Bootstrap (bootstrapModule)

Entry Point:
Use main.ts with

platformBrowserDynamic().bootstrapModule(AppModule);


AppModule:
Defines imports, declarations, providers, and bootstrap: [AppComponent].

Root Injector Creation:
Angular constructs the module injector starting from AppModule.

NgModule Providers:
All services declared in providers (or imported modules) are added to the root injector.

APP_INITIALIZER Execution:
Runs any initializers registered inside AppModule.

Root Component Mounting:
Angular instantiates the AppComponent listed in AppModule.bootstrap.

Router Setup:
Router is configured by importing RouterModule.forRoot(routes) inside AppModule.

Legacy Approach:
Still widely used in mature codebases but less tree-shakeable compared to standalone.

==========================================================================================

⚖️ Key Differences

Standalone

No NgModule, uses bootstrapApplication and functional providers.

Faster startup, smaller bundle sizes, easier incremental migration.

Recommended for Angular 15+ projects.

NgModule

Uses AppModule and bootstrapModule.

Verbose and less optimal for tree-shaking.

Still valid for older codebases or gradual migration.

*/