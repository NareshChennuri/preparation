<mat-menu #filterMenu="matMenu" class="custom-menu">
  <div class="menu-header">
    <span>Filter Options</span>
    <button mat-icon-button (click)="filterMenu.close()">
      <mat-icon>close</mat-icon>
    </button>
  </div>

  <mat-divider></mat-divider>

  <mat-radio-group [(ngModel)]="selectedOption">
    <mat-radio-button *ngFor="let option of radioOptions" [value]="option">
      {{ option }}
    </mat-radio-button>
  </mat-radio-group>

  <mat-divider></mat-divider>

  <mat-checkbox *ngFor="let checkbox of checkBoxOptions" [(ngModel)]="checkbox.selected">
    {{ checkbox.label }}
  </mat-checkbox>

  <mat-divider></mat-divider>

  <div class="menu-actions">
    <button mat-button (click)="applyFilters()">Apply</button>
    <button mat-button (click)="clearFilters()">Cancel</button>
  </div>
</mat-menu>

<button mat-button [matMenuTriggerFor]="filterMenu">
  Open Filters
</button>
