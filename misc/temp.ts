<mat-form-field appearance="outline">
  <label class="mat-label">Is this a MyLearning Event?</label>
  <mat-radio-group [(ngModel)]="lobGrpName" class="radio-group">
    <mat-radio-button value="Yes">Yes</mat-radio-button>
    <mat-radio-button value="No">No</mat-radio-button>
  </mat-radio-group>
</mat-form-field>
