// Modified to use menu icon with edit/delete actions
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

interface TeamResponse {
  teamName: string;
  lockTeam: string;
  teamMembers: any[];
  tEmailAddress: string;
  tlName: string;
}

interface Team {
  teamName: string;
  locked?: boolean;
  members: Member[];
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
    this.http.get<TeamResponse[]>('/api/teams').subscribe({
      next: (data) => {
        this.teams = data.map(t => {
          const members = t.teamMembers.map(m => ({
            standardId: m.standardId,
            fullName: m.teamMemberName,
            role: m.role || 'Team Member',
            region: m.region || '',
            email: m.emailAddress || t.tEmailAddress,
            chapter: m.language || ''
          }));

          return {
            teamName: t.teamName,
            locked: t.lockTeam === 'Y',
            members
          };
        });
      },
      error: () => this.snackBar.open('Failed to load teams.', 'Close', { duration: 3000 })
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '600px',
      data: { teamSize: this.teamSize, mode: 'create', currentTeams: this.teams }
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
      data: {
        teamSize: this.teamSize,
        mode: 'edit',
        teamData: { ...team },
        currentTeams: this.teams
      }
    });

    dialogRef.afterClosed().subscribe((updatedTeam: Team) => {
      if (updatedTeam) {
        this.http.put<Team>(`/api/teams/${updatedTeam.teamName}`, updatedTeam).subscribe({
          next: () => {
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
        `${team.teamName ?? ''}`,
        `${member.standardId ?? ''}`,
        `${member.fullName ?? ''}`,
        `${member.role ?? ''}`,
        `${member.region ?? ''}`,
        `${member.email ?? ''}`,
        `${member.chapter ?? ''}`
      ].map(val => `"${val}"`).join(','))
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


<h2 mat-dialog-title>{{ data.mode === 'edit' ? 'Edit Team' : 'Create Team' }}</h2>

<mat-dialog-content [formGroup]="form">
  <mat-form-field appearance="fill" class="full-width">
    <mat-label>Team Name</mat-label>
    <input matInput formControlName="teamName" />
  </mat-form-field>

  <div class="chip-list-section">
    <mat-chip-list>
      <mat-chip
        *ngFor="let member of teamMembers"
        [removable]="member.role !== 'TL'"
        (removed)="removeMember(member)"
      >
        <mat-icon *ngIf="member.role === 'TL'" matTooltip="Team Lead">star</mat-icon>
        {{ member.fullName }} ({{ member.standardId }})
        <mat-icon *ngIf="member.role !== 'TL'" matChipRemove>cancel</mat-icon>
      </mat-chip>
    </mat-chip-list>
  </div>

  <mat-form-field appearance="fill" class="full-width">
    <mat-label>Search Member</mat-label>
    <input
      type="text"
      matInput
      [matAutocomplete]="auto"
      [formControl]="memberSearchCtrl"
      placeholder="Search by name or standard ID"
    />
    <mat-autocomplete #auto="matAutocomplete" (optionSelected)="addMember($event.option.value)">
      <mat-option *ngFor="let member of filteredMembers" [value]="member">
        {{ member.fullName }} ({{ member.standardId }})
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>

  <mat-form-field appearance="fill" class="full-width">
    <mat-label>Select Team Lead</mat-label>
    <mat-select [value]="selectedTL" (selectionChange)="assignTeamLead($event.value)">
      <mat-option *ngFor="let member of teamMembers" [value]="member.standardId">
        {{ member.fullName }} ({{ member.standardId }})
      </mat-option>
    </mat-select>
  </mat-form-field>
</mat-dialog-content>

<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-flat-button color="primary" (click)="submit()" [disabled]="form.invalid || teamMembers.length === 0">
    {{ data.mode === 'edit' ? 'Update' : 'Create' }}
  </button>
</mat-dialog-actions>