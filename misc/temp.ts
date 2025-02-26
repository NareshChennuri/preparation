
  getStandardTimezone(ianaTimezone: string): string {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', { timeZone: ianaTimezone, timeZoneName: 'short' });
      const parts = formatter.formatToParts(new Date());
      const timeZoneAbbr = parts.find(part => part.type === 'timeZoneName')?.value || 'Invalid Timezone';
      return timeZoneAbbr;
    } catch (error) {
      return 'Invalid Timezone';
    }
  }

  let timeZone = this.getStandardTimezone('America/New_York');


