<mat-form-field appearance="outline" class="custom-mat-select">
  <mat-label>Select an option</mat-label>
  <mat-select>
    <mat-option *ngFor="let option of options" [value]="option">
      {{ option }}
    </mat-option>
  </mat-select>
  <mat-icon matSuffix class="custom-icon">expand_more</mat-icon>
</mat-form-field>


.custom-mat-select .mat-mdc-text-field-wrapper {
    border-radius: 12px !important; /* Adjust for roundness */
  }
  
  .custom-icon {
    font-size: 24px; /* Customize icon size */
    color: #007bff; /* Customize icon color */
  }
  