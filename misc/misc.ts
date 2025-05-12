import { RRule } from 'rrule';

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

function toCompactZFormat(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
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

    const exDateSet = new Set(exDates);

    // Loop through future occurrences to find one not in exDates
    const occurrences = rule.between(now, until, true); // include current day
    let nextValidDate: Date | null = null;

    for (const occ of occurrences) {
      const occCompact = toCompactZFormat(occ); // e.g., 20250601T120000Z
      if (!exDateSet.has(occCompact)) {
        nextValidDate = occ;
        exDateSet.add(occCompact);
        break;
      }
    }

    if (!nextValidDate) {
      return {
        nextOccurrenceFormatted: null,
        updatedExDates: Array.from(exDateSet)
      };
    }

    return {
      nextOccurrenceFormatted: formatToEST(nextValidDate),
      updatedExDates: Array.from(exDateSet)
    };
  } catch (error) {
    console.error('Invalid RRULE or dates:', error);
    return { nextOccurrenceFormatted: null, updatedExDates: exDates };
  }
}
