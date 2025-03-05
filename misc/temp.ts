npm install -g @angular/cli

ng new innovation-portal-ui-v1 --style=scss --routing --module
cd innovation-portal-ui-v1

# Install Angular Material
ng add @angular/material

# Generate core, shared, and layout modules
ng g m core
ng g m shared
ng g m layout

# Generate authentication module and components
ng g m auth --module app-routing.module.ts
ng g c auth/login
ng g s core/auth --flat
ng g s core/rbac --flat

# Generate feature modules
ng g m features/academy-resources --module app-routing.module.ts
ng g m features/technology-focus-group --module app-routing.module.ts
ng g m features/global-technology-lab --module app-routing.module.ts
ng g m features/admin-console --module app-routing.module.ts

# Generate layout components
ng g c layout/header
ng g c layout/footer
ng g c layout/sidebar

# Generate services
ng g s core/http-client
ng g s core/error-handler
ng g s core/logging
ng g s shared/modal
ng g s core/preload-data
ng g s core/loader

# Generate interceptors
ng g interceptor core/auth
ng g interceptor core/error
ng g interceptor core/loader

# Create environment configurations
echo "export const environment = { production: false };" > src/environments/environment.ts
echo "export const environment = { production: true };" > src/environments/environment.prod.ts
echo "export const environment = { production: false, name: 'sit' };" > src/environments/environment.sit.ts
echo "export const environment = { production: false, name: 'uat' };" > src/environments/environment.uat.ts
echo "export const environment = { production: false, name: 'dev' };" > src/environments/environment.dev.ts
echo "export const environment = { production: false, name: 'qa' };" > src/environments/environment.qa.ts

# Add Git hooks for Prettier
npm install --save-dev husky lint-staged prettier
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
echo "{ \"*.{ts,js,html,scss}\": \"prettier --write\" }" > .lintstagedrc.json

# Implement Navigation & Routing
ng g c shared/navigation

# Generate Menu Structure
ng g c features/academy-resources/academy-on-demand
ng g c features/academy-resources/learning-hub
ng g c features/academy-resources/lab-request/lab-resources-home
ng g c features/academy-resources/lab-request/available-courses
ng g c features/academy-resources/lab-request/reserve-lab-time
ng g c features/academy-resources/lab-request/my-reservations

ng g c features/technology-focus-group/code-challenge-home
ng g c features/technology-focus-group/browse-events
ng g c features/technology-focus-group/training-request/request-form
ng g c features/technology-focus-group/training-request/request-details
ng g c features/technology-focus-group/technology-focus-group/create-event
ng g c features/technology-focus-group/technology-focus-group/tfg-signup
ng g c features/technology-focus-group/technology-focus-group/events-calendar
ng g c features/technology-focus-group/technology-focus-group/event-management
ng g c features/technology-focus-group/technology-focus-group/event-report
ng g c features/technology-focus-group/technology-focus-group/facilitator-signup
ng g c features/technology-focus-group/technology-focus-group/survey
ng g c features/technology-focus-group/one-click-lab-access/python
ng g c features/technology-focus-group/one-click-lab-access/oracle-sql
ng g c features/technology-focus-group/one-click-lab-access/java
ng g c features/technology-focus-group/one-click-lab-access/cloud

ng g c features/global-technology-lab/global-technology-lab-home
ng g c features/global-technology-lab/poc-details
ng g c features/global-technology-lab/poc-guidelines
ng g c features/global-technology-lab/poc-summaries

ng g c features/admin-console/admin-dashboard
