/*

> ng update @angular/cli
> ng update @angular/core

> ng generate @angular/core:control-flow

upgrading a fairly simple government site from Angular 5 to 12. 

I Used the official Angular upgrade guide 
and paid attention to every step on their checklist. 
I had very little break in the app itself. 
Most of the work was upgrading everything sequentially using the Angular CLI and npm. 
Most of it is done using the angular CLI 
but at certain points you will need to force upgrades to typescript and zone.js with npm, 
breaking the current version of Angular, to satisfy dependencies for the next. 

You have to use npx to stop Angular from trying to use the latest version of the CLI. 
You’ll know that’s failing because it wants Node 18.


Upgrading an Angular app involves updating your application's dependencies, codebase, and configurations to a newer version of Angular. The process can vary based on the difference between the current and target Angular versions. Here's a general outline of the steps to upgrade an Angular app:

Review the Release Notes:
Before you start upgrading, read the official Angular release notes for the versions you're targeting. This will help you understand the changes, new features, and potential breaking changes in the newer Angular versions.

Backup Your Project:
Create a backup of your project's codebase, configurations, and dependencies. This is a precautionary step in case something goes wrong during the upgrade process.

Update Node.js and npm:
Make sure you're using the latest stable version of Node.js and npm (Node Package Manager).

Update Angular CLI:
Update your Angular CLI to the latest version. You can do this by running the following command:

> ng update @angular/cli

Update Angular Core Packages:
Update the core Angular packages (such as @angular/core, @angular/common, @angular/router, etc.) by running:
ng update @angular/cli
> ng update @angular/core

This command will analyze your app's dependencies and suggest updates.

Update Third-Party Dependencies:
Review and update your third-party dependencies in your package.json file. You might need to update these dependencies to versions that are compatible with the target Angular version.

Update RxJS and TypeScript:
Check if your app's rxjs and typescript versions need to be updated. Angular versions often have specific requirements for these packages.

Update Codebase:
Check for any code changes required due to API changes or deprecated features in the new Angular version. The release notes should provide guidance on these changes.

Update Angular CLI Configurations:
Review your angular.json file for any breaking changes in the CLI configuration. You might need to adjust build options or paths.

Test and Debug:
Thoroughly test your app after the upgrade. Make sure all functionalities are working as expected. Debug and resolve any issues that arise during testing.

Optimize and Refactor:
Take the opportunity to refactor your codebase, adopt new best practices, and make performance improvements based on the latest version's guidelines.

Update CSS and Styling:
If you're using Angular Material or any other styling library, ensure that they are compatible with the upgraded Angular version.

Documentation and Resources:
Keep the official Angular documentation, relevant blog posts, and community discussions handy to address any specific issues you encounter during the upgrade.

Remember that the complexity of the upgrade process can vary based on the differences between the current and target Angular versions, as well as the specific dependencies and custom code in your project. It's essential to thoroughly test your app after each step and have a rollback plan in case any critical issues arise.

*/