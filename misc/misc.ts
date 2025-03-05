import { Component, OnInit } from '@angular/core';
import { PreloadDataService } from './core/preload-data.service';
import { LoaderService } from './core/loader.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private preloadDataService: PreloadDataService,
    private loaderService: LoaderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Load essential data before app renders
    this.preloadDataService.loadInitialData();

    // Subscribe to loader state
    this.loaderService.isLoading.subscribe((state) => {
      this.loading = state;
    });

    // Check if user is authenticated (SSO handling)
    this.authService.checkAuthentication();
  }
}



<app-header></app-header>

<div class="main-container">
  <app-sidebar></app-sidebar>
  <div class="content">
    <router-outlet></router-outlet>
  </div>
</div>

<app-footer></app-footer>

<!-- Global Loader -->
<div class="global-loader" *ngIf="loading">
  <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
</div>



.main-container {
  display: flex;
  height: 100vh;

  .content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
  }
}

.global-loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
}
