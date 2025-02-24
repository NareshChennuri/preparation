import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmationDialogData {
  eventId: number; // Change type if needed
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) { }
}

<h2 mat-dialog-title>Confirm Delete</h2>
<mat-dialog-content>
  <p>Are you sure you want to delete event #{{ data.eventId }}?</p>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close="false">Cancel</button>
  <button mat-button color="warn" mat-dialog-close="true">Yes</button>
</mat-dialog-actions>


import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogData } from './confirmation-dialog.component';

@Component({
  selector: 'app-event-list',
  template: `
    <!-- Assume you have an event object with an id -->
    <button mat-raised-button color="warn" (click)="openDeleteDialog(event.id)">Delete Event</button>
  `
})
export class EventListComponent {
  constructor(private dialog: MatDialog) { }

  openDeleteDialog(eventId: number): void {
    const dialogRef = this.dialog.open<ConfirmationDialogComponent, ConfirmationDialogData, boolean>(
      ConfirmationDialogComponent,
      {
        width: '300px',
        data: { eventId }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEvent(eventId);
      }
      // If result is false, do nothing (dialog simply closes)
    });
  }

  deleteEvent(eventId: number): void {
    // Place your deletion logic here using the eventId
    console.log(`Deleting event with id: ${eventId}`);
    // For example, call a service to delete the event from the backend
  }
}
