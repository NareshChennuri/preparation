<mat-form-field appearance="outline">
  <mat-label>Search</mat-label>
  <input matInput #searchInput type="text" [(ngModel)]="searchText" (keyup.enter)="onSearch()">
  
  <!-- Icons inside the input field -->
  <div class="suffix-container">
    <mat-icon class="clickable-icon" (click)="onSearch()">search</mat-icon>
    <span class="separator">|</span>
    <mat-icon *ngIf="searchText" class="clickable-icon" (click)="clearSearch()">clear</mat-icon>
  </div>
</mat-form-field>


.suffix-container {
  display: flex;
  align-items: center;
  gap: 8px; /* Adjust spacing between icons */
}

.separator {
  font-size: 18px;
  color: #999; /* Adjust color if needed */
}

.clickable-icon {
  cursor: pointer;
  user-select: none;
}