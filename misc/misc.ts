submit(): void {
  const isEdit = !!this.data.teamData;
  const newName = this.teamData.teamName.trim().toLowerCase();

  const nameExists = this.data.currentTeams.some((t: any) => {
    const match = t.teamName.trim().toLowerCase() === newName;
    return isEdit
      ? match && t.teamName !== this.data.teamData.teamName // prevent false positive in edit
      : match;
  });

  if (nameExists) {
    this.snackBar.open('Team name already exists.', 'Close', { duration: 3000 });
    return;
  }

  this.dialogRef.close(this.teamData);
}
