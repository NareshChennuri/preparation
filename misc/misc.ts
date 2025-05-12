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

  // Normalize exDates to 'YYYY-MM-DD'
  const exDateSet = new Set(
    exDates.map(dateStr => new Date(dateStr).toISOString().split('T')[0])
  );

  // Today's UTC date (zeroed out time)
  const todayUTC = new Date();
  const todayDayOnly = new Date(Date.UTC(
    todayUTC.getUTCFullYear(),
    todayUTC.getUTCMonth(),
    todayUTC.getUTCDate()
  ));

  // Create rule
  const rule = RRule.fromString(rruleString);
  const allOccurrences = rule.between(startDate, endDate, true); // include start/end

  let nextValidDate: Date | null = null;

  for (const occ of allOccurrences) {
    const occDayOnly = new Date(Date.UTC(
      occ.getUTCFullYear(),
      occ.getUTCMonth(),
      occ.getUTCDate()
    ));

    const occDateOnlyStr = occ.toISOString().split('T')[0];

    if (occDayOnly > todayDayOnly && !exDateSet.has(occDateOnlyStr)) {
      nextValidDate = occ;
      break;
    }
  }

  return {
    nextOccurrenceFormatted: nextValidDate ? nextValidDate.toISOString() : null,
    updatedExDates: Array.from(exDateSet)
  };
}
