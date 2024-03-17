/** 

Parent child:  Input, Output & Event emitters. ViewChild.

Navigating:  Routing

Global data : Services, Local storage, Temp storage


Using Input and Output Properties:
==================================================
Parent Component (parent.component.ts):
------------------------
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

Child Component (child.component.ts):
-------------------
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

Using ViewChild
=================================
// ParentComponent.ts
-------------------------------
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
------------------------------
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>Child Component</p>`
})
export class ChildComponent {
  childMessage = 'Hello from Child Component!';
}



Using Services:
============================================
Shared Service (data.service.ts):
-------------------------
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messageSource = new BehaviorSubject<string>("Initial message");
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
Parent Component (parent.component.ts):
---------------------
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-parent',
  template: `
    <app-child></app-child>
  `,
})
export class ParentComponent {
  constructor(private dataService: DataService) {}

  sendMessageToChild() {
    this.dataService.changeMessage("Message from parent");
  }
}
Child Component (child.component.ts):
----------------------------
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-child',
  template: `
    <p>{{ message }}</p>
  `,
})
export class ChildComponent implements OnInit {
  message: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.message = message);
  }
}

*/