function formatToEST(date: Date): string {
    return date.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '') + ' EST';
  }
  
  function toCleanISOString(date: Date): string {
    return date.toISOString().replace('.000', '');
  }
  
  export function getNextOccurrenceAndExDatesFromISO(
    rruleString: string,
    executionStartDateISO: string,
    executionEndDateISO: string,
    exDates: string[] = []
  ): { nextOccurrenceFormatted: string | null; updatedExDates: string[] } {
    try {
      const start = new Date(executionStartDateISO);
      const until = new Date(executionEndDateISO);
  
      const options = RRule.parseString(rruleString);
      options.dtstart = start;
      options.until = until;
  
      const rule = new RRule(options);
      const now = new Date();
  
      const next = rule.after(now, true); // inclusive
      if (!next) return { nextOccurrenceFormatted: null, updatedExDates: exDates };
  
      const nextISO = toCleanISOString(next); // without .000
      const updatedExDates = [...exDates, nextISO];
      const nextFormatted = formatToEST(next);
  
      return {
        nextOccurrenceFormatted: nextFormatted,
        updatedExDates
      };
    } catch (error) {
      console.error('Invalid RRULE or date:', error);
      return { nextOccurrenceFormatted: null, updatedExDates: exDates };
    }
  }