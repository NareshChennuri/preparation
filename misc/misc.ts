submit(): void {
  const newName = this.teamData.teamName.trim().toLowerCase();

  const nameExists = this.data.currentTeams.some((team: any) => {
    const match = team.teamName.trim().toLowerCase() === newName;
    return this.data.mode === 'edit'
      ? match && team.id !== this.teamData.id  // ignore same team ID in edit
      : match;
  });

  if (nameExists) {
    this.snackBar.open('Team name already exists.', 'Close', { duration: 3000 });
    return;
  }

  this.dialogRef.close(this.teamData);
}
