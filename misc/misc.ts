import { RRule } from 'rrule';

export function getNextOccurrenceAndExDatesFromISO(
  rruleString: string,
  executionStartDateISO: string,
  executionEndDateISO: string,
  exDates: string[] = []
): { nextOccurrenceFormatted: string | null; updatedExDates: string[] } {
  try {
    const start = new Date(executionStartDateISO);
    const until = new Date(executionEndDateISO);

    // Remove seconds from both start and until
    start.setSeconds(0, 0);
    until.setSeconds(59, 999); // end of the minute

    const options = RRule.parseString(rruleString);
    options.dtstart = start;
    options.until = until;

    const rule = new RRule(options);
    const now = new Date();

    const next = rule.after(now, true); // inclusive
    if (!next) return { nextOccurrenceFormatted: null, updatedExDates: exDates };

    // Trim seconds and milliseconds
    next.setSeconds(0, 0);
    const nextISO = next.toISOString(); // e.g., "2025-10-02T21:15:00Z"

    const updatedExDates = [...exDates, nextISO];

    return {
      nextOccurrenceFormatted: nextISO,
      updatedExDates
    };
  } catch (error) {
    console.error('Invalid RRULE or date:', error);
    return { nextOccurrenceFormatted: null, updatedExDates: exDates };
  }
}
