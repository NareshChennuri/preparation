import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';

interface Member {
  standardId: string;
  fullName: string;
  role: string;
  region: string;
  email: string;
  chapter: string;
}

interface Team {
  teamName: string;
  members: Member[];
  locked?: boolean;
}

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss']
})
export class ManageTeamComponent implements OnInit {
  @Input() teamSize = 7;
  displayedColumns = ['standardId', 'fullName', 'role', 'region', 'email', 'chapter'];
  teams: Team[] = [];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  fetchTeams(): void {
    this.http.get<Team[]>('/api/teams').subscribe({
      next: (data) => this.teams = data,
      error: () => this.snackBar.open('Failed to load teams.', 'Close', { duration: 3000 })
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '600px',
      data: { teamSize: this.teamSize }
    });

    dialogRef.afterClosed().subscribe((newTeam: Team) => {
      if (newTeam) {
        const exists = this.teams.some(t => t.teamName.toLowerCase() === newTeam.teamName.toLowerCase());
        if (!exists) {
          this.http.post<Team>('/api/teams', newTeam).subscribe({
            next: (created) => {
              this.teams.push(created);
              this.snackBar.open('Team created successfully!', 'Close', { duration: 2000 });
            },
            error: () => this.snackBar.open('Failed to create team.', 'Close', { duration: 3000 })
          });
        } else {
          this.snackBar.open('Team name already exists.', 'Close', { duration: 3000 });
        }
      }
    });
  }

  openEditDialog(team: Team): void {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '600px',
      data: { teamSize: this.teamSize, teamData: { ...team } }
    });

    dialogRef.afterClosed().subscribe((updatedTeam: Team) => {
      if (updatedTeam) {
        this.http.put<Team>(`/api/teams/${updatedTeam.teamName}`, updatedTeam).subscribe({
          next: (res) => {
            const index = this.teams.findIndex(t => t.teamName === updatedTeam.teamName);
            if (index !== -1) {
              this.teams[index] = updatedTeam;
              this.snackBar.open('Team updated successfully!', 'Close', { duration: 2000 });
            }
          },
          error: () => this.snackBar.open('Failed to update team.', 'Close', { duration: 3000 })
        });
      }
    });
  }

  deleteTeam(teamName: string): void {
    const confirmDelete = window.confirm(`Are you sure you want to delete team "${teamName}"?`);
    if (confirmDelete) {
      this.http.delete(`/api/teams/${teamName}`).subscribe({
        next: () => {
          this.teams = this.teams.filter(t => t.teamName !== teamName);
          this.snackBar.open('Team deleted.', 'Close', { duration: 2000 });
        },
        error: () => this.snackBar.open('Failed to delete team.', 'Close', { duration: 3000 })
      });
    }
  }

  exportCSV(): void {
    const rows = this.teams.flatMap(team =>
      team.members.map(member => [
        team.teamName,
        member.standardId,
        member.fullName,
        member.role,
        member.region,
        member.email,
        member.chapter
      ].join(','))
    );
    const csv = 'Team Name,Standard ID,Full Name,Role,Region,Email,Chapter\n' + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teams.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}


<div class="actions">
  <button mat-raised-button color="primary" (click)="openCreateDialog()">Create Team</button>
  <button mat-raised-button color="accent" (click)="exportCSV()">Export CSV</button>
</div>

<div *ngFor="let team of teams">
  <h3 class="team-title" (click)="openEditDialog(team)">{{ team.teamName }}</h3>
  <button mat-button color="warn" (click)="deleteTeam(team.teamName)">Delete</button>

  <table mat-table [dataSource]="team.members" class="mat-elevation-z2" matSort>
    <ng-container matColumnDef="standardId">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>Standard ID</th>
      <td mat-cell *matCellDef="let member">{{ member.standardId }}</td>
    </ng-container>
    <ng-container matColumnDef="fullName">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>Full Name</th>
      <td mat-cell *matCellDef="let member">{{ member.fullName }}</td>
    </ng-container>
    <ng-container matColumnDef="role">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>Role</th>
      <td mat-cell *matCellDef="let member">{{ member.role }}</td>
    </ng-container>
    <ng-container matColumnDef="region">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>Region</th>
      <td mat-cell *matCellDef="let member">{{ member.region }}</td>
    </ng-container>
    <ng-container matColumnDef="email">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
      <td mat-cell *matCellDef="let member">{{ member.email }}</td>
    </ng-container>
    <ng-container matColumnDef="chapter">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>Chapter</th>
      <td mat-cell *matCellDef="let member">{{ member.chapter }}</td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>
  <mat-paginator [pageSize]="5"></mat-paginator>
</div>


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss']
})
export class TeamDialogComponent {
  teamData = this.data.teamData || { teamName: '', members: [], locked: false };
  teamSize = this.data.teamSize;
  searchText = '';
  filteredMembers: any[] = [];
  allMembers = [
    { standardId: 'ZK1', fullName: 'John Wick', role: 'Team Member', region: 'US-EST', email: 'john@abc.com', chapter: 'Python' },
    { standardId: 'ZK2', fullName: 'Jane Doe', role: 'Team Member', region: 'US-CST', email: 'jane@abc.com', chapter: 'Java' }
  ];

  constructor(public dialogRef: MatDialogRef<TeamDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  searchMembers(): void {
    const term = this.searchText.toLowerCase();
    this.filteredMembers = this.allMembers.filter(m =>
      m.fullName.toLowerCase().includes(term) || m.standardId.toLowerCase().includes(term)
    );
  }

  addMember(member: any): void {
    const exists = this.teamData.members.some(m => m.standardId === member.standardId);
    if (!exists && this.teamData.members.length < this.teamSize) {
      this.teamData.members.push(member);
    }
  }

  removeMember(member: any): void {
    this.teamData.members = this.teamData.members.filter(m => m.standardId !== member.standardId);
  }

  submit(): void {
    this.dialogRef.close(this.teamData);
  }
}




<mat-form-field>
  <input matInput placeholder="Team Name" [(ngModel)]="teamData.teamName">
</mat-form-field>
<mat-slide-toggle [(ngModel)]="teamData.locked">Locked</mat-slide-toggle>

<mat-form-field>
  <input matInput [(ngModel)]="searchText" placeholder="Search by Name or Standard ID" (input)="searchMembers()">
</mat-form-field>

<div *ngFor="let member of filteredMembers">
  {{ member.fullName }} ({{ member.standardId }}) 
  <button mat-button (click)="addMember(member)">Add</button>
</div>

<mat-chip-list>
  <mat-chip *ngFor="let member of teamData.members" [removable]="true" (removed)="removeMember(member)">
    {{ member.fullName }} ({{ member.standardId }})
    <mat-icon matChipRemove>cancel</mat-icon>
  </mat-chip>
</mat-chip-list>

<button mat-raised-button color="primary" (click)="submit()" [disabled]="teamData.members.length > teamSize">Submit</button>




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeams(): Observable<any> {
    return this.http.get('/api/teams');
  }

  createTeam(team: any): Observable<any> {
    return this.http.post('/api/teams', team);
  }

  updateTeam(teamName: string, team: any): Observable<any> {
    return this.http.put(`/api/teams/${teamName}`, team);
  }

  deleteTeam(teamName: string): Observable<any> {
    return this.http.delete(`/api/teams/${teamName}`);
  }
}
