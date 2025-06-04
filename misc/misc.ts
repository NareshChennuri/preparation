// Updated to match API response structure from screenshot
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
        this.teams = data.map(t => ({
          teamName: t.teamName,
          locked: t.lockTeam === 'Y',
          members: t.teamMembers.map(m => ({
            standardId: m.standardId,
            fullName: m.teamMemberName,
            role: m.role || 'Team Member',
            region: m.region || '',
            email: m.emailAddress || t.tEmailAddress,
            chapter: m.language || ''
          }))
        }));
      },
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
