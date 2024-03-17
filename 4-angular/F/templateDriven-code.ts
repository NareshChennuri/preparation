`<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
  <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" class="form-control" id="name" name="name" ngModel required>
    <div *ngIf="myForm.controls['name'].invalid && (myForm.controls['name'].dirty || myForm.controls['name'].touched)">
      <div *ngIf="myForm.controls['name'].errors.required">Name is required.</div>
    </div>
  </div>

  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" class="form-control" id="email" name="email" ngModel required email>
    <div *ngIf="myForm.controls['email'].invalid && (myForm.controls['email'].dirty || myForm.controls['email'].touched)">
      <div *ngIf="myForm.controls['email'].errors.required">Email is required.</div>
      <div *ngIf="myForm.controls['email'].errors.email">Invalid email format.</div>
    </div>
  </div>

  <button type="submit" class="btn btn-primary" [disabled]="myForm.invalid">Submit</button>
</form>

<div *ngIf="submitted">
  <h4>Form Submitted Successfully</h4>
  <p>Name: {{ formData.name }}</p>
  <p>Email: {{ formData.email }}</p>
</div>`;

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formData: any = {};
  submitted: boolean = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.formData = form.value;
      this.submitted = true;
    }
  }
}