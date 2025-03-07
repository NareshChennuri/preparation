import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

interface ProgramOffering {
  id: number;
  lookupName: string;
  longName: string;
  shortName: string;
  status: string;
  refId: number;
}

interface DropdownOption {
  type: 'option' | 'group';
  label?: string;
  value?: string;
  options?: { value: string; viewValue: string }[];
}

@Component({
  selector: 'app-event-dropdown',
  templateUrl: './event-dropdown.component.html',
  styleUrls: ['./event-dropdown.component.scss']
})
export class EventDropdownComponent {
  eventControl = new FormControl();
  dropdownOptions: DropdownOption[] = [];

  programOfferings: ProgramOffering[] = [
    {"id": 40, "lookupName": "ProgramOfferings", "longName": "Cohorts", "shortName": "COHORTS", "status": "A", "refId": 0},
    {"id": 41, "lookupName": "ProgramOfferings", "longName": "Office Hours", "shortName": "OFFICEHRS", "status": "A", "refId": 0},
    {"id": 113, "lookupName": "ProgramOfferings", "longName": "Tech Talks", "shortName": "TECHTALKS", "status": "A", "refId": 0},
    {"id": 133, "lookupName": "ProgramOfferings", "longName": "Vendor Workshops", "shortName": "VENDORWORKSHOPS", "status": "A", "refId": 0},
    {"id": 134, "lookupName": "ProgramOfferings", "longName": "Facilitated Training", "shortName": "FACILITATEDTRNG", "status": "A", "refId": 0},
    {"id": 135, "lookupName": "ProgramOfferings", "longName": "Competitions", "shortName": "COMPETATIONS", "status": "A", "refId": 135},
    {"id": 179, "lookupName": "ProgramOfferings", "longName": "Quizzes", "shortName": "QUIZZES", "status": "A", "refId": 135},
    {"id": 180, "lookupName": "ProgramOfferings", "longName": "Codeathon", "shortName": "CODEATHON", "status": "A", "refId": 135},
    {"id": 181, "lookupName": "ProgramOfferings", "longName": "Crosswords", "shortName": "CROSSWORDS", "status": "A", "refId": 135},
    {"id": 182, "lookupName": "ProgramOfferings", "longName": "Technical Contest", "shortName": "TECHCONTEST", "status": "A", "refId": 135}
  ];

  constructor() {
    this.dropdownOptions = this.buildDropdownOptions(this.programOfferings);
  }

  buildDropdownOptions(data: ProgramOffering[]): DropdownOption[] {
    let groupedOptions: DropdownOption[] = [];
    let groups: { [key: number]: DropdownOption } = {};

    // Create groups
    data.forEach((item) => {
      if (item.id === item.refId) {
        groups[item.id] = {
          type: "group",
          label: item.longName,
          options: []
        };
      }
    });

    // Assign sub-options to their respective groups
    data.forEach((item) => {
      if (item.id !== item.refId && groups[item.refId]) {
        groups[item.refId].options?.push({
          value: item.shortName,
          viewValue: item.longName
        });
      } else if (item.refId === 0) {
        // Standalone options
        groupedOptions.push({
          type: "option",
          value: item.shortName,
          label: item.longName
        });
      }
    });

    // Convert groups to an array
    Object.values(groups).forEach((group) => {
      groupedOptions.push(group);
    });

    return groupedOptions;
  }
}


<mat-form-field>
  <mat-label>Select an Event</mat-label>
  <mat-select [formControl]="eventControl">
    <!-- Normal options (No Group) -->
    <ng-container *ngFor="let option of dropdownOptions">
      <mat-option *ngIf="option.type === 'option'" [value]="option.value">
        {{ option.label }}
      </mat-option>

      <!-- Grouped options -->
      <mat-optgroup *ngIf="option.type === 'group'" [label]="option.label">
        <mat-option *ngFor="let subOption of option.options" [value]="subOption.value">
          {{ subOption.viewValue }}
        </mat-option>
      </mat-optgroup>
    </ng-container>
  </mat-select>
</mat-form-field>
