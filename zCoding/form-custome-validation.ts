@Component({
  selector: 'app-root',
  standalone: true,
  imports:[ReactiveFormsModule, NgIf],
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
