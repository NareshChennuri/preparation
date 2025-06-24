/*


Using floatLabel="never" (for legacy appearance):

<mat-form-field floatLabel="never">
  <mat-label>Input Label</mat-label>
  <input matInput placeholder="Enter value">
</mat-form-field>

Removing <mat-label> and using placeholder (for non-legacy appearances):
For mat-form-field with outline, fill, or standard appearances, the floatLabel="never" option is not supported.

<mat-form-field appearance="outline">
  <input matInput placeholder="Enter value">
</mat-form-field>


import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'legacy' } },
  ],
})
export class AppModule { }





*/