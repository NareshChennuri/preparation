addMember(member: Member): void {
  const existsInCurrentTeam = this.teamData.members.some(m => m.standardId === member.standardId);
  const existsInAnyTeam = this.data.currentTeams?.some((team: any) =>
    team.members.some((m: Member) => m.standardId === member.standardId)
  );

  if (existsInCurrentTeam) {
    this.snackBar.open('Member already exists in this team.', 'Close', { duration: 3000 });
  } else if (existsInAnyTeam) {
    this.snackBar.open('Member is already assigned to another team.', 'Close', { duration: 3000 });
  } else if (this.teamData.members.length >= this.teamSize) {
    this.snackBar.open(`Cannot exceed maximum team size of ${this.teamSize}.`, 'Close', { duration: 3000 });
  } else {
    this.teamData.members.push(member);
  }
}
