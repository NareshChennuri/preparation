<div class="team-header">
  <h3 class="team-title">{{ team.teamName }}</h3>
  <button mat-icon-button [matMenuTriggerFor]="menu">
    <mat-icon>more_vert</mat-icon>
  </button>
  <mat-menu #menu="matMenu">
    <button mat-menu-item (click)="openEditDialog(team)">
      <mat-icon>edit</mat-icon> Edit
    </button>
    <button mat-menu-item (click)="deleteTeam(team.teamName)">
      <mat-icon>delete</mat-icon> Delete
    </button>
  </mat-menu>
</div>


.team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 0.5rem;
}
