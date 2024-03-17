/*
Angular offers two main approaches to forms: Template-driven forms and Reactive forms (also known as Model-driven forms)

1. **Template-driven forms:**
   Template-driven forms are simpler and generally easier to set up. 
   They are primarily built using Angular templates, and the form's structure is defined directly in the HTML markup. 
   These forms rely on directives to handle form validation and data binding.

   Key features of template-driven forms:
   - Minimal TypeScript code is required.
   - Form controls are defined using directives like `ngModel`, `ngForm`, and others.
   - Data binding between form controls and model data is handled automatically.
   - Basic validation is done through HTML attributes like `required`, `min`, `max`, etc.
   - Limited customization and complex validation scenarios can be challenging.

2. **Reactive forms (Model-driven forms):**
   Reactive forms are more flexible and powerful, suitable for complex scenarios and custom validations. 
   They are built using TypeScript to define the form structure and behavior. 
   Reactive forms provide more explicit control over the form and its validation logic.

   Key features of reactive forms:
   - More TypeScript code is required to define form controls, validators, and handling.
   - Form controls are defined programmatically in the component class.
   - Changes in form state are tracked through RxJS observables.
   - More complex validation scenarios can be easily implemented using custom validators.
   - Enhanced flexibility and testability.

In both types of forms, you can create various types of form controls like text inputs, checkboxes, radio buttons, selects, etc. Additionally, Angular provides support for form validation, form groups (grouping related form controls), form arrays (dynamic lists of form controls), and more.

Choosing between template-driven forms and reactive forms depends on the complexity of your form requirements and your familiarity with each approach. Template-driven forms are often quicker to set up but might be limited in terms of customization and handling complex scenarios. Reactive forms offer greater control and flexibility but require more code and a deeper understanding of Angular and TypeScript.

Ultimately, the choice of which type of form to use will depend on your project's specific needs and your development preferences.

======================================

Advantages of Template-Driven Forms:

Ease of Use: 

Template-driven forms are generally easier to create and understand, especially for developers who are new to Angular or web development in general. They are more intuitive and require less boilerplate code.

Minimal Component Code: 

With template-driven forms, much of the form logic is handled within the template itself using directives like ngModel, ngForm, and ngSubmit. This can lead to smaller component files, which might be advantageous for simpler forms.

Less Reactive Programming Knowledge Required: 

Reactive programming concepts such as Observables and FormControl can be complex for newcomers. Template-driven forms do not require as deep an understanding of reactive programming.

Rapid Prototyping: 

For quickly creating prototypes or simple forms, template-driven forms can be a faster choice since they involve less setup and configuration.

----------------------------------
Advantages of Reactive Forms:
------------------------------------------

Full Programmatic Control: Reactive forms provide a more explicit and programmatic way of handling forms. You have fine-grained control over form fields, validation, and form behavior through reactive programming using Observables and FormControl objects.

Reusability: Reactive forms promote reusability and maintainability. Form controls and validation logic can be encapsulated within the component code, allowing you to easily reuse the same form structure across different parts of your application.

Complex Forms and Dynamic Behavior: For complex forms with dynamic fields or intricate validation requirements, reactive forms are often a better choice. The reactive approach can handle complex scenarios more effectively by allowing you to create custom validators, async validation, and dynamic form control creation.

Unit Testing: Reactive forms can be more easily unit tested, as you have full control over the form controls and their behavior. This is important for ensuring that your forms function as expected.

Type Safety: Reactive forms can take advantage of TypeScript's strong typing, providing better type safety and early error detection during development.

Performance: Reactive forms can be more performant in certain scenarios since they don't rely on two-way data binding like template-driven forms. They also provide better control over change detection strategies.

======================================
Template driven

<fieldset [formGroup]="form">
    <legend>{{legend}}</legend>
    <mat-form-field>
        <input matInput
               placeholder="Address Line 1"
               formControlName="addressLine1" (blur)="onTouched()">
    </mat-form-field>

    <div class="form-val">
        {{form.value | json}}
    </div>

    <div class="form-val">
        {{form.valid | json}}
    </div>
</fieldset>

====================================================================================
Reactive forms

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormBuilder, FormGroup,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    Validator,
    Validators
} from '@angular/forms';
import { noop, Subscription } from 'rxjs';

@Component({
    selector: 'address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: AddressFormComponent
        }
    ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {

    @Input()
    legend: string;

    onTouched = () => { };

    onChangeSub: Subscription;

    form: FormGroup = this.fb.group({
        addressLine1: [null, [Validators.required]],
        addressLine2: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        city: [null, [Validators.required]]
    });

    constructor(private fb: FormBuilder) {
    }

    registerOnChange(onChange: any) {
        this.onChangeSub = this.form.valueChanges.subscribe(onChange);
    }

    ngOnDestroy() {
        this.onChangeSub.unsubscribe();
    }

    writeValue(value: any) {
        if (value) {
            this.form.setValue(value);
        }
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    setDisabledState(disabled: boolean) {
        if (disabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
        }
    }
}

*/