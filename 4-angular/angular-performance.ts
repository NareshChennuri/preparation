/*

common performance bottlenecks 
 - Large Bundle sizes (lazy loading)
    - code splitting
    - tree shaking    
 - Change detection (on push change detection)
    - OnPush change detection strategy
    - Immutable data structures  (immutable.js)
        reduces the chances of unitentional updates and enhances performace
 - Network Requests (data caching using http interceptors for http requests - new map(url, responseObj))
    - caching strategies
        - Cache-First Strategy (it first checks the cache. If the requested data is available uses it otherwise fetches from the network.)
        - Network-First Strategy (Only when the network fails does the application look to the cache for data.)
        - Stale-While-Revalidate Strategy (It serves from the cache for immediate response, but updates the cache with fresh data from the network in the background for future requests.)
 - Memory Leaks (angular built in tools - memory profiling, unsubscribe from observables)

Angular Load Performance
Angular Runtime Performance

Loading time Performance
----------------------------------
1. Always lazy load modules
2. Properly configure route preloading strategy
3. Only render what is visible on current viewport
    - Lazy loading images
    - Infinite scrolling 
4. Analyze bundle size regularly ( BundleSizeAnlyzer npm package)

Runtime perfromance
---------------------------------
1. OnPush change detection strategy 
    - default change detection re-renders from top to bottom of the component tree.
    - whenever some change occurs, Angular will check each property of the object 
        to see if there was some change and update the DOM accordingly. 
    - This can be a huge impact on app performance.

    - OnPush will optimize the renderer process by rendering only the specific path that was impacted by the change.

    @Component({
     selector: ‘child-component',
     changeDetection: ChangeDetectionStrategy.OnPush,
     template: `...`
    })

2. Enable Angular’s Debug Tools - enableDebugTools() (you can run ng profiler in the console to see change detection performance)

    > main.ts (by adding enableDebugTools in bootstrapmodule)

        platformBrowserDynamic().bootstrapModule(AppModule)
        .then(module => enableDebugTools(module.injector.get(ApplicationRef).components[0]))
        .catch(err => console.error(err));

    in console - developer tools run
    ng.profiler.timeChangeDetection()
    - never let your change detection cycle go beyond 10ms.

3. Use TrackBy function with ngFor

    <div *ngFor="let obj of arrayOfObj;trackBy:trackByKey">{{obj.key}}</div>

    trackByKey = (index: number, obj: object): string => {
        return object.key;
    };

    - when you change the collection, Angular can track which items have been added or removed 
        according to the unique identifier and create or destroy only the items that changed. 

4. Use Web Workers for heavy lifting tasks
    - Web apps would run better if heavy computations could be performed in the background.

    > ng generate web-worker <location>
        - creates a new file "tsconfig.worker.json"
        - Creates "app.worker.ts" and this is where you get the response from the worker.
        - In angular.json, adds ”webWorkerTsConfig”: “tsconfig.worker.json” in build > options and registers the generated tsconfig file for the web worker.
        - Your app.component.ts will also be modified and the worker will be used here.

        ex: factorialFunction(n) // you can give this to webworker it will run in the background

5.         

*/