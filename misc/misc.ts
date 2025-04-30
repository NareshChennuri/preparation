import { RRule } from 'rrule';

interface DateStruct {
  year: number;
  month: number;
  day: number;
}

interface TimeStruct {
  hour: number;
  minute: number;
  second: number;
  timeMeridian?: 'AM' | 'PM' | null;
}

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

export function getNextOccurrenceAndExDates(
  rruleString: string,
  executionStartDate: DateStruct,
  executionStartTime: TimeStruct,
  executionEndDate: DateStruct,
  exDates: string[] = []
): { nextOccurrenceFormatted: string | null; updatedExDates: string[] } {
  const start = new Date(
    executionStartDate.year,
    executionStartDate.month - 1,
    executionStartDate.day,
    executionStartTime.hour,
    executionStartTime.minute,
    executionStartTime.second
  );

  const until = new Date(
    executionEndDate.year,
    executionEndDate.month - 1,
    executionEndDate.day,
    23, 59, 59
  );

  try {
    const options = RRule.parseString(rruleString);
    options.dtstart = start;
    options.until = until;

    const rule = new RRule(options);
    const now = new Date();

    const next = rule.after(now, true);
    if (!next) return { nextOccurrenceFormatted: null, updatedExDates: exDates };

    const nextISO = next.toISOString();
    const updatedExDates = [...exDates, nextISO];
    const nextFormatted = formatToEST(next);

    return {
      nextOccurrenceFormatted: nextFormatted,
      updatedExDates
    };
  } catch (error) {
    console.error('Invalid RRULE:', error);
    return { nextOccurrenceFormatted: null, updatedExDates: exDates };
  }
}
