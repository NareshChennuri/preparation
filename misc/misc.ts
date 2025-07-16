assignTeamLead(selectedId: string): void {
  this.teamData.members = this.teamData.members.map(member => ({
    ...member,
    role: member.standardId === selectedId ? 'TL' : 'Team Member'
  }));
}