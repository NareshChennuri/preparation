/**

- two way data bining : [{ngModel}]="user.email"
- one way : [ngModel] = "user.email"
- property binding : [value] = "user.email"

From the Component to the DOM:

Interpolation: {{ value }}: Adds the value of a property from the component
<li>Name: {{ user.name }}</li>
<li>Address: {{ user.address }}</li>


Property binding: [property]=”value”: The value is passed from the component to the specified property or simple HTML attribute
<input type="email" [value]="user.email">


From the DOM to the Component: Event binding: (event)=”function”: When a specific DOM event happens (eg.: click, change, keyup), call the specified method in the component
<button (click)="logout()"></button>


Two-way binding: Two-way data binding: [(ngModel)]=”value”: Two-way data binding allows to have the data flow both ways. For example, in the below code snippet, both the email DOM input and component email property are in sync
<input type="email" [(ngModel)]="user.email">



Create a Checkbox Component:


// checkbox-item.model.ts

export interface CheckboxItem {
  id: number;
  label: string;
  checked: boolean;
}
Create a CheckboxListComponent:


// checkbox-list.component.ts

import { Component } from '@angular/core';
import { CheckboxItem } from './checkbox-item.model';

@Component({
  selector: 'app-checkbox-list',
  template: `
    <div *ngFor="let item of checkboxItems">
      <input
        type="checkbox"
        [(ngModel)]="item.checked"
        (change)="onCheckboxChange(item)"
      />
      {{ item.label }}
    </div>
  `,
})
export class CheckboxListComponent {
  checkboxItems: CheckboxItem[] = [
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: false },
    { id: 3, label: 'Item 3', checked: false },
  ];

  onCheckboxChange(item: CheckboxItem): void {
    console.log(`Checkbox ${item.label} changed. New state: ${item.checked}`);
  }
}
App Module Configuration:

Ensure that you have the FormsModule imported in your app.module.ts file to use ngModel for two-way data binding.


// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { CheckboxListComponent } from './checkbox-list.component';

@NgModule({
  declarations: [CheckboxListComponent],
  imports: [BrowserModule, FormsModule], // Add FormsModule to imports
  bootstrap: [CheckboxListComponent],
})
export class AppModule {}
Include the Component in HTML:

Finally, include the <app-checkbox-list></app-checkbox-list> tag in your index.html or another Angular component where you want to use the checkbox list.

html
Copy code
<!-- index.html or another Angular component's template -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Angular Checkbox List Example</title>
  </head>
  <body>
    <app-checkbox-list></app-checkbox-list>
  </body>
</html>
This example demonstrates a list of checkboxes with two-way data binding using [(ngModel)]. The onCheckboxChange method is triggered whenever a checkbox state changes. Note that for two-way data binding, the FormsModule is imported and used in the CheckboxListComponent.










*/