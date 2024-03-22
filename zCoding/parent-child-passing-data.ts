//Using Input and Output Properties:/
//==================================================
//Parent Component (parent.component.ts):
//------------------------
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child [message]="parentMessage" (messageEvent)="receiveMessage($event)"></app-child>
  `,
})
export class ParentComponent {
  parentMessage = "Message from parent";

  receiveMessage($event: string) {
    console.log($event);
  }
}

//Child Component (child.component.ts):
//-------------------
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <p>{{ message }}</p>
    <button (click)="sendMessage()">Send Message</button>
  `,
})
export class ChildComponent {
  @Input() message: string;
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit("Message from child");
  }
}
