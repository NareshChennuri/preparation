import { DateTime } from 'luxon';
import { RRule } from 'rrule';

/**
 * Finds the next execution DateTime in the given zone.
 * If that instant is excluded by exdates, returns the next day
 * at the same local wall-clock time (skipping through consecutive exdates).
 */
export function nextExecutionDate(
  startISO: string,
  endISO: string,
  zoneId: string,
  rruleStr: string,
  exdates: string[] = []
): DateTime | null {
  const startDT = DateTime.fromISO(startISO, { zone: zoneId });
  const endDT   = DateTime.fromISO(endISO,   { zone: zoneId });
  const now     = DateTime.now().setZone(zoneId);

  // Normalize EXDATEs to UTC millisecond instants for exact matching
  // setZone: true respects the offset/Z provided in the string.
  const exMillis = new Set(
    exdates
      .filter(Boolean)
      .map(d => DateTime.fromISO(d, { setZone: true }).toUTC().toMillis())
  );

  const isExcluded = (dt: DateTime) => exMillis.has(dt.toUTC().toMillis());

  // Parse RRULE (accepts "RRULE:" prefix)
  let s = (rruleStr ?? '').trim();
  if (s.startsWith('RRULE:')) s = s.slice(6).trim();
  const base = RRule.fromString(s);

  const rule = new RRule({
    ...base.origOptions,
    dtstart: startDT.toJSDate(),
    until: endDT.toJSDate()
  });

  // Helper: if candidate is excluded, move to next day at same local time
  const skipExcludedDays = (candidate: DateTime): DateTime => {
    let c = candidate;
    while (isExcluded(c)) {
      c = c.plus({ days: 1 });
    }
    return c;
  };

  // If start is still ahead of now, start there (but honor exdates)
  if (startDT >= now) {
    const cand = skipExcludedDays(startDT);
    return cand <= endDT ? cand : null;
  }

  // Get the next rrule occurrence >= now
  const nextJs = rule.after(now.toJSDate(), true); // inclusive
  if (!nextJs) return null;

  let nextDT = DateTime.fromJSDate(nextJs).setZone(zoneId);

  // If excluded, return next day(s) at same local time
  nextDT = skipExcludedDays(nextDT);

  return nextDT <= endDT ? nextDT : null;
}
