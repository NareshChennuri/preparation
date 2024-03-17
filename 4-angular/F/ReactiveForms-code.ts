/*

- We import FormBuilder, FormGroup, and Validators from @angular/forms.
- In the component class, we define a FormGroup named myForm using FormBuilder.group().
- We define form controls with initial values and validators (if any).
- In the template, we bind form controls to the FormGroup using formControlName.
- We handle form submission with (ngSubmit) and call the onSubmit() method.
- In the onSubmit() method, we set submitted to true, check if the form is invalid, and then process the form data.
- We display validation errors conditionally based on form validity and user interaction.



// app.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    // Process form submission here
    console.log('Form submitted successfully!');
    console.log('Name:', this.myForm.value.name);
    console.log('Email:', this.myForm.value.email);
  }
}


<!-- app.component.html -->

<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" class="form-control" formControlName="name">
    <div *ngIf="submitted && myForm.controls.name.errors?.required" class="text-danger">Name is required.</div>
  </div>

  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" class="form-control" formControlName="email">
    <div *ngIf="submitted && myForm.controls.email.errors?.required" class="text-danger">Email is required.</div>
    <div *ngIf="submitted && myForm.controls.email.errors?.email" class="text-danger">Invalid email format.</div>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>




*/