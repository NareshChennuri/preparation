import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { SessionWarningDialogComponent } from './session-warning-dialog/session-warning-dialog.component';
import { Subject, interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SessionTimeoutService {
  private warningTimeout: any;
  private logoutTimeout: any;
  private dialogRef: MatDialogRef<SessionWarningDialogComponent> | null = null;
  private countdownSub: Subscription | null = null;

  private readonly WARNING_TIME = 3 * 60 * 1000; // 3 min
  private readonly LOGOUT_TIME = 4 * 60 * 1000; // 4 min

  constructor(private dialog: MatDialog, private ngZone: NgZone) {}

  startTimer() {
    this.clearTimers();
    this.warningTimeout = setTimeout(() => this.showWarning(), this.WARNING_TIME);
    this.logoutTimeout = setTimeout(() => this.logout(), this.LOGOUT_TIME);
  }

  resetTimer() {
    this.startTimer();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  clearTimers() {
    if (this.warningTimeout) clearTimeout(this.warningTimeout);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
    if (this.countdownSub) this.countdownSub.unsubscribe();
    if (this.dialogRef) this.dialogRef.close();
  }

  showWarning() {
    this.ngZone.run(() => {
      let counter = 60;
      this.dialogRef = this.dialog.open(SessionWarningDialogComponent, {
        width: '350px',
        disableClose: true,
        data: { counter }
      });

      // Countdown logic
      this.countdownSub = interval(1000)
        .pipe(take(60))
        .subscribe(
          () => {
            counter--;
            if (this.dialogRef) {
              this.dialogRef.componentInstance.counter = counter;
            }
          },
          null,
          () => {
            // countdown finished, dialog auto-closes after logout
          }
        );

      this.dialogRef.afterClosed().subscribe(result => {
        if (result === 'resume') {
          this.resetTimer();
        }
      });
    });
  }

  logout() {
    this.clearTimers();
    window.location.href = environment.sloUrl;
  }
}


-----------------------

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-warning-dialog',
  templateUrl: './session-warning-dialog.component.html',
  styleUrls: ['./session-warning-dialog.component.scss']
})
export class SessionWarningDialogComponent {
  counter: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { counter: number },
    private dialogRef: MatDialogRef<SessionWarningDialogComponent>
  ) {
    this.counter = data.counter;
  }

  resumeSession() {
    this.dialogRef.close('resume');
  }
}



---------------------------


<div class="session-warning-dialog">
  <h2>Session Expiring Soon</h2>
  <p>Your session will expire in <strong>{{ counter }}</strong> seconds due to inactivity.</p>
  <button mat-raised-button color="primary" (click)="resumeSession()">Resume Session</button>
</div>


-----------------------

.session-warning-dialog {
  text-align: center;
  h2 { margin-bottom: 12px; }
  p { margin-bottom: 18px; font-size: 18px; }
  button { min-width: 120px; }
}

