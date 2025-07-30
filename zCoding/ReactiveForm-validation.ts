import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, this.validatePhoneNumber()]]
    });
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

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }
}


<form [formGroup]="registerForm" (ngSubmit)="onSubmit()">

  <label>Username:</label>
  <input type="text" formControlName="username" />
  <div *ngIf="registerForm.get('username')?.touched && registerForm.get('username')?.invalid">
    <small *ngIf="registerForm.get('username')?.errors?.['required']">Username is required.</small>
    <small *ngIf="registerForm.get('username')?.errors?.['minlength']">Minimum 3 characters.</small>
  </div>

  <label>Email:</label>
  <input type="email" formControlName="email" />
  <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid">
    <small *ngIf="registerForm.get('email')?.errors?.['required']">Email is required.</small>
    <small *ngIf="registerForm.get('email')?.errors?.['email']">Invalid email format.</small>
  </div>

  <label>Password:</label>
  <input type="password" formControlName="password" />
  <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid">
    <small *ngIf="registerForm.get('password')?.errors?.['required']">Password is required.</small>
    <small *ngIf="registerForm.get('password')?.errors?.['minlength']">Minimum 6 characters.</small>
  </div>

  <button type="submit" [disabled]="registerForm.invalid">Register</button>
</form>