import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child #child1></app-child>
    <app-child #child2></app-child>
    <button (click)="toggleFirstChildVisibility()">Toggle First Child</button>
    <div>
      <button (click)="logChildrenCount()">Log Children Count</button>
    </div>
  `
})
export class ParentComponent {
  @ViewChild('child1') child1!: ChildComponent;
  @ViewChild('child2') child2!: ChildComponent;
  @ViewChildren(ChildComponent) children!: QueryList<ChildComponent>;

  constructor() { }

  toggleFirstChildVisibility() {
    this.child1.isHidden = !this.child1.isHidden;
  }

  logChildrenCount() {
    console.log('Number of children:', this.children.length);
  }
}