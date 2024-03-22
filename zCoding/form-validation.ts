import 'zone.js';
import {Component, inject} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[FormsModule, JsonPipe, NgIf],
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <div>
      <input type="text" required id="userName" name="userName" placeholder="Enter user name" ngModel/>
      <div *ngIf="f.controls['userName'].invalid && (f.controls['userName'].touched || f.controls['userName'].dirty)">
        <div *ngIf="f.controls['userName'].errors?.['required']">User name is required</div>
        </div>
</div>
<div>
      <input type="email" required email id="email" name="email" placeholder="Enter email" ngModel/>
      <div *ngIf="f.controls['email'].invalid && (f.controls['email'].touched || f.controls['email'].dirty)">
        <div *ngIf="f.controls['email'].errors?.['required']">Email is required</div>
        <div *ngIf="f.controls['email'].errors?.['email']">Invalid email format.</div>
      </div>
</div>
      <button type="submit" [disabled]="f.invalid">Submit</button>

</form>
  `,
})
export class App2 {

  onSubmit(form: any) {
    if(form.valid) {
      console.log(form.value, '---> send these values to db');
    }
    
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports:[ReactiveFormsModule, JsonPipe, NgIf],
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <div>
      <input type="text" id="name" name="name" placeholder="Enter user name" formControlName="name"/>
      <div *ngIf="submitted && myForm.controls['name'].errors?.['required']">User name is required</div>
</div>
<div>
      <input type="email" id="email" name="email" placeholder="Enter email" formControlName="email"/>
      <div *ngIf="submitted && myForm.controls['email'].errors?.['required']">Email is required</div>
      <div *ngIf="submitted && myForm.controls['email'].errors?.['email']">Email is invalid</div> 
      <div *ngIf="submitted && myForm.controls['email'].errors?.['containsSubstring']">Email should be with "gmail" domain</div> 
</div>
<div>
      <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter phone number" formControlName="phoneNumber"/>
      <div *ngIf="submitted && myForm.controls['phoneNumber'].errors?.['invalidPhoneNumber']">Invalid phone number</div>
</div>
      <button type="submit">Submit</button>

</form>
  `,
})
export class App {
  myForm!: FormGroup;
  submitted = false;
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.containsSubstringValidator('@gmail.com')]],
      phoneNumber: ['', [Validators.required, this.validatePhoneNumber()]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if(this.myForm.invalid) {
      return;
    }
    console.log(this.myForm.value.name);
    console.log(this.myForm.value.email, '---> call the api service');
  }

  containsSubstringValidator(substring: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (!value || value.indexOf(substring) === -1) {
        return { 'containsSubstring': { value: value } };
      }
      return null;
    };
  }

  validatePhoneNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber: string = control.value;
      //validate phone number sd
      let invalid = true;
      if(invalid) {
        return { 'invalidPhoneNumber' : { value: phoneNumber} };
      }
      return null;
    };
  }

}

bootstrapApplication(App);
