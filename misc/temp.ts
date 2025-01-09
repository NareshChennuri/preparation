<mat-toolbar>
  <button mat-icon-button [matMenuTriggerFor]="filterMenu" aria-label="Filter options">
    <mat-icon>filter_list</mat-icon>
  </button>
</mat-toolbar>

<mat-menu #filterMenu="matMenu">
  <button mat-menu-item (click)="applyFilter('All')">All</button>
  <button mat-menu-item (click)="applyFilter('East')">East</button>
  <button mat-menu-item (click)="applyFilter('West')">West</button>
</mat-menu>

<div>
  <!-- Display the selected filter -->
  <p>Selected Filter: {{ selectedFilter }}</p>
</div>


import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css'],
})
export class FilterDropdownComponent {
  selectedFilter: string = 'All';

  applyFilter(region: string): void {
    this.selectedFilter = region;
    // Perform any action based on the selected filter
    console.log(`Filter applied: ${region}`);
    // Example: You can filter data here or trigger another function
    this.filterData(region);
  }

  filterData(region: string): void {
    if (region === 'All') {
      console.log('Displaying all data.');
    } else {
      console.log(`Filtering data for region: ${region}`);
    }
    // Add your data filtering logic here
  }
}


mat-toolbar {
  display: flex;
  justify-content: flex-start;
  background-color: #3f51b5;
  color: white;
}

button[mat-icon-button] {
  color: white;
}

div {
  margin-top: 20px;
  font-size: 16px;
}


/* Set the width of the mat-menu */
.custom-menu .mat-menu-content {
  width: 300px;
}

/* Change the hover color to blue */
.custom-menu .mat-menu-item:hover {
  background-color: #1976d2; /* Blue color */
  color: white; /* Optional: Change text color to white */
}
