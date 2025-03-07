<mat-form-field appearance="outline">
  <mat-label>Select an Option</mat-label>
  <mat-select (selectionChange)="onOptionChange($event.value)">
    <mat-option *ngFor="let option of mainOptions" [value]="option">
      {{ option.longName }}
    </mat-option>
  </mat-select>
</mat-form-field>

<!-- Show second dropdown if a group is selected -->
<mat-form-field *ngIf="selectedGroup && subOptions.length > 0" appearance="outline">
  <mat-label>Select a Sub-Option</mat-label>
  <mat-select [(value)]="selectedSubOption">
    <mat-option *ngFor="let subOption of subOptions" [value]="subOption">
      {{ subOption.longName }}
    </mat-option>
  </mat-select>
</mat-form-field>


import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  jsonData = [
    { "id": 40, "createdBy": "ZKJA2IN", "lookupName": "ProgramOfferings", "longName": "Cohorts", "shortName": "COHORTS", "status": "A", "refId": 0 },
    { "id": 41, "createdBy": "ZKJA2IN", "lookupName": "ProgramOfferings", "longName": "Office Hours", "shortName": "OFFICEHRS", "status": "A", "refId": 0 },
    { "id": 135, "createdBy": "nbkkhdx", "lookupName": "ProgramOfferings", "longName": "Competitions", "shortName": "COMPETATIONS", "status": "A", "refId": 135 },
    { "id": 179, "createdBy": "ZKJA2IN", "lookupName": "ProgramOfferings", "longName": "Quizzes", "shortName": "QUIZZES", "status": "A", "refId": 135 },
    { "id": 180, "createdBy": "ZKJA2IN", "lookupName": "ProgramOfferings", "longName": "Codeathon", "shortName": "CODEATHON", "status": "A", "refId": 135 },
    { "id": 181, "createdBy": "ZKJA2IN", "lookupName": "ProgramOfferings", "longName": "Crosswords", "shortName": "CROSSWORDS", "status": "A", "refId": 135 },
    { "id": 182, "createdBy": "ZKJA2IN", "lookupName": "ProgramOfferings", "longName": "Technical Contest", "shortName": "TECHCONTEST", "status": "A", "refId": 135 }
  ];

  mainOptions = this.jsonData.filter(option => option.id === option.refId || option.refId === 0);
  subOptions: any[] = [];
  selectedGroup: any;
  selectedSubOption: any;

  onOptionChange(option: any) {
    if (option.id === option.refId) {
      this.selectedGroup = option;
      this.subOptions = this.jsonData.filter(sub => sub.refId === option.id && sub.id !== sub.refId);
    } else {
      this.selectedGroup = null;
      this.subOptions = [];
    }
  }
}
