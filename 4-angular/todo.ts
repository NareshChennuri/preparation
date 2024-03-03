/*

import 'zone.js';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms'
import {bootstrapApplication} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[FormsModule, CommonModule],
  styles: ['.strike { text-decoration: line-through}', '.unorder {list-style-type: none}'],
  template: `
    <h1>Todo App</h1>
    <input type="text" [(ngModel)]="newTodo" placeholder="Add a new todo">
    <button (click)="addTodo()">Add</button>
    <ul>
      <li *ngFor="let todo of todos" class="unorder">
        <input type="checkbox" [(ngModel)]="todo.completed">
        <span [ngClass]="todo.completed ? 'strike' : ''">{{ todo.text }}</span>
      </li>
    </ul>
  `,
})
export class App {
  todos: { text: string, completed: boolean }[] = [];
  newTodo = '';

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({ text: this.newTodo, completed: false });
      this.newTodo = '';
    }
  }
}

bootstrapApplication(App);


*/