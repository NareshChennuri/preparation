/*

*ngTemplateOutlet (dynamic template rendering)
--------------------
    - ngTemplateOutlet is a directive in Angular used for dynamic template rendering
    - Enables the reuse of templates across different components with different data context.

<ng-template #templateA>
  <h2>Template A</h2>
  <p>This is the content of Template A.</p>
</ng-template>

<ng-template #templateB>
  <h2>Template B</h2>
  <p>This is the content of Template B.</p>
</ng-template>

<child-app [templateToRender]="selectedTemplate"></child-app> 

> Child-Component.html (input -> templateToRender)
------------------------
<div>
  <h1>Child Component</h1>
  <ng-container *ngTemplateOutlet="templateToRender"></ng-container>
</div>

*/