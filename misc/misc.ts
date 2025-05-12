import { RRule } from 'rrule';

interface OccurrenceResult {
  nextOccurrenceFormatted: string | null;
  updatedExDates: string[];
}

export function getNextOccurrenceAndExDatesFromISO(
  rruleString: string,
  executionStartDateISO: string,
  executionEndDateISO: string,
  exDates: string[]
): OccurrenceResult {
  const startDate = new Date(executionStartDateISO);
  const endDate = new Date(executionEndDateISO);

  // Normalize existing exDates to date-only strings (YYYY-MM-DD)
  const exDateSet = new Set(
    exDates.map(dateStr => new Date(dateStr).toISOString().split('T')[0])
  );

  // Today's UTC date (00:00 time)
  const todayUTC = new Date();
  const todayDayOnly = new Date(Date.UTC(
    todayUTC.getUTCFullYear(),
    todayUTC.getUTCMonth(),
    todayUTC.getUTCDate()
  ));

  // Generate all possible occurrences between start and end
  const rule = RRule.fromString(rruleString);
  const allOccurrences = rule.between(startDate, endDate, true); // include start/end

  let nextValidDate: Date | null = null;

  for (const occ of allOccurrences) {
    const occDateOnly = occ.toISOString().split('T')[0];
    const occDayOnly = new Date(Date.UTC(
      occ.getUTCFullYear(),
      occ.getUTCMonth(),
      occ.getUTCDate()
    ));

    if (occDayOnly > todayDayOnly && !exDateSet.has(occDateOnly)) {
      nextValidDate = occ;
      exDateSet.add(occDateOnly); // Add newly selected date to exDates
      break;
    }
  }

  return {
    nextOccurrenceFormatted: nextValidDate ? nextValidDate.toISOString() : null,
    updatedExDates: Array.from(exDateSet).sort() // Optional: keep it sorted
  };
}
