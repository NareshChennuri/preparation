//Using ViewChild
//=================================
// ParentComponent.ts
//-------------------------------
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <p>Parent Component</p>
    <button (click)="sendMessageToChild()">Send Message to Child</button>
    <p>Message from Child: {{ childMessage }}</p>
    <app-child></app-child>
  `
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) childComponent!: ChildComponent;
  childMessage: string = '';

  ngAfterViewInit() {
    this.childMessage = this.childComponent.childMessage;
  }

  sendMessageToChild() {
    // Accessing child component's method
    this.childComponent.childMessage = 'Message updated from Parent';
    // Updating parent component property
    this.childMessage = this.childComponent.childMessage;
  }
}


// ChildComponent.ts
//------------------------------
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>Child Component</p>`
})
export class ChildComponent {
  childMessage = 'Hello from Child Component!';
}
