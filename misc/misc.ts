<div *ngFor="let team of teamsList" class="team-section">
  <!-- Team Name and Actions Header -->
  <div class="team-header">
    <div class="team-name">{{ team.teamName }}</div>
    <div class="team-actions">
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="editTeam(team)">Edit Team</button>
        <button mat-menu-item (click)="deleteTeam(team)">Delete Team</button>
      </mat-menu>
    </div>
  </div>

  <!-- Team Table -->
  <table mat-table [dataSource]="team.members" class="mat-elevation-z2">
    <!-- Columns like Standard ID, Full Name, Role, Region, Email, Chapter -->
    <!-- Repeat table structure here -->
  </table>
</div>


.team-section {
  margin-bottom: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}

.team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.team-name {
  font-weight: bold;
  font-size: 1.2rem;
}

.team-actions {
  display: flex;
  align-items: center;
}
