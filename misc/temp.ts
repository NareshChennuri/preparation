ng generate component shared/modal-dialog

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ModalDialogData {
  title?: string;
  content?: string;
  actions?: { label: string; action: () => void; color?: string }[];
}

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
})
export class ModalDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalDialogData
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}



<div class="modal-header">
  <h2 mat-dialog-title>{{ data.title || 'Default Title' }}</h2>
  <button mat-icon-button (click)="close()" aria-label="Close">
    <mat-icon>close</mat-icon>
  </button>
</div>

<div mat-dialog-content>
  <p>{{ data.content || 'Default Content' }}</p>
</div>

<div mat-dialog-actions align="end">
  <button
    *ngFor="let action of data.actions"
    mat-button
    [color]="action.color || 'primary'"
    (click)="action.action()"
  >
    {{ action.label }}
  </button>
</div>


.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}





import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModalComponent, MaterialModalData } from '../shared/material-modal/material-modal.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  constructor(private dialog: MatDialog) {}

  openModal(): void {
    const dialogData: MaterialModalData = {
      title: 'Confirm Action',
      content: 'Are you sure you want to proceed?',
      actions: [
        { label: 'Cancel', action: () => console.log('Cancel clicked'), color: 'warn' },
        { label: 'Confirm', action: () => console.log('Confirm clicked') },
      ],
    };

    this.dialog.open(MaterialModalComponent, {
      width: '400px',
      data: dialogData,
    });
  }
}


<button mat-raised-button color="primary" (click)="openModal()">Open Modal</button>

