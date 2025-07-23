/*

- Control flow syntax

        <h1>Angular 17</h1>
        @if (isUserAvailable) {
        <p>User available</p>
        } @else {
        <p>User Not available</p>
        }

        <!-- Angular 16 and previous versions -->
        <div *ngFor="let item of items; let i = index;">
        <p>{{ item }}</p>
        </div>

        <!-- Angular 17 -->
        @for (item of items; track item.id) {
        <p>{{ item }}</p>
        }

        <!-- Angular 16 and previous versions -->
        <div [ngSwitch]="color"> 
        <app-color *ngSwitchCase="red"/>
        <app-color *ngSwitchCase="blue"/>
        <app-default-color *ngSwitchDefault/>
        </div>

        <!-- Angular 17 -->
        @switch (color) {
            @case ('red') {
                <app-red-color />
            }
            @case ('blue') {
                <app-blue-color />
            }
            @default {
                <app-default-color />
            }
        }        

- Deferrable views (using @deffer templates, we can lazy load components when a condition is met)

    if we want to display a separate component, when “user scrolls to that section” or “in 5 seconds” we can use @deffer templates.

        @defer (when show) {
            <ns-demo-component />
        }
        @placeholder {
            <div>Something until the loading starts</div>
        }
        @loading (after 500ms; minimum 500ms) {
            <div>Loading...</div>
        }
        @error {<div>Something went wrong</div>
        }

    deferrable views contain the below triggers.
        on idle — lazy load when the browser is idle
        on immediate — lazy load immediately
        on timer() — delay loading with a timer
        on viewport
        on interaction and on interaction() — lazy load when the user interacts with a particular element
        on hover and on hover() — lazy load when the user hovers an element

- Signals: stable
- Dev tools
- Server-side rendering improvements (ng new angular-demo-application --ssr)
- New Lifestyle hooks (afterRender and afterNextRender)
        - afterRender can be used to register a callback which will be invoked every time the application finishes rendering 
        - afterNextRender can be used to register a callback to be invoked the next time the application finishes rendering.
- Style and Style Urls as Strings
- Performance Improvements
- Security Improvements



*/