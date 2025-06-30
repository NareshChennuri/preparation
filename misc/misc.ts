import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../environments/environment'; // Adjust path

@Injectable({ providedIn: 'root' })
export class SessionTimeoutService {
  private warningTimeout: any;
  private logoutTimeout: any;
  private readonly WARNING_TIME = 3 * 60 * 1000; // 3 min
  private readonly LOGOUT_TIME = 4 * 60 * 1000; // 4 min

  constructor(private dialog: MatDialog, private router: Router, private ngZone: NgZone) {}

  startTimer() {
    this.clearTimers();
    // Show warning at 3 mins
    this.warningTimeout = setTimeout(() => this.showWarning(), this.WARNING_TIME);
    // Logout at 4 mins
    this.logoutTimeout = setTimeout(() => this.logout(), this.LOGOUT_TIME);
  }

  resetTimer() {
    this.startTimer();
  }

  clearTimers() {
    if (this.warningTimeout) clearTimeout(this.warningTimeout);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  showWarning() {
    this.dialog.open(SessionWarningDialog, {
      width: '350px',
      disableClose: true,
      data: { message: 'Your session will expire in 1 minute due to inactivity.' }
    });
  }

  logout() {
    this.clearTimers();
    window.location.href = environment.sloUrl;
  }
}

---------------------


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'session-warning-dialog',
  template: `
    <div>
      <h2>Session Expiry</h2>
      <p>{{data.message}}</p>
    </div>
  `
})
export class SessionWarningDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}

---------------------

import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { SessionTimeoutService } from './session-timeout.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private sessionTimeout: SessionTimeoutService) {}

  ngOnInit() {
    this.sessionTimeout.startTimer();
  }

  ngOnDestroy() {
    this.sessionTimeout.clearTimers();
  }

  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  @HostListener('document:touchstart')
  resetSession() {
    this.sessionTimeout.resetTimer();
  }
}
