`<form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
  <input
    type="text"
    name="name"
    ngModel
    #name="ngModel"
    placeholder="Enter user name"
    required
  />
  @if(name.touched && name.invalid ) {
  <div>Name is required</div>
  }
  <br /><br />
  <input
    type="text"
    name="email"
    ngModel
    #email="ngModel"
    placeholder="Enter email"
    required
    email
  />
  @if(email.touched && email.invalid ) {
    @if(email.errors?.['required'] ) {
      <div>Email is required</div>
      }
    @if(email.errors?.['email'] ) {
    <div>Email is invalid</div>
    }
  }
  <br /><br />
  <button [disabled]="contactForm?.invalid">Submit</button>
</form>
`;

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  submitted: boolean = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
    }
  }
}