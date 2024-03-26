import 'zone.js';
import { Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
<!-- create a reactive form 

name required
email required email
status required dropdown yes/no

description input required - only status is yes (display only status is yes)

console.log (display all the values)

-->

<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
<div>
  <input type="text" formControlName="name" placeholder="enter your name"/>
</div>
<div>
  <input type="email" formControlName="email" placeholder="enter email"/>
</div>
<div>
  <select formControlName="status" (change)="statusChange($event)">
  <option>Yes</option>
  <option>No</option>
</select>
</div>
<div *ngIf="myForm.controls['status'].value == 'Yes'">
  <input type="description" formControlName="description" placeholder="enter description"/>
</div>
<button type="submit">Submit</button>
</form>
  `,
})
export class App {
  myForm!: FormGroup;
  private fb = inject(FormBuilder);
  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      description: [''],
    });
  }
  statusChange(event :any) {
    if(event.target.value == 'Yes') {
      this.myForm.controls['description'].setValidators([Validators.required]);
    } else {
      this.myForm.controls['description'].removeValidators([]);
    }
  }
  onSubmit() {
    if(this.myForm.valid) {
      console.log(this.myForm.value);
    } else {
      console.log('error');
    }
  }
}

bootstrapApplication(App);
