import { DateTime } from 'luxon';
import { RRule } from 'rrule';

export function nextExecutionDate(
  startDate: string,
  endDate: string,
  zoneId: string,
  rruleStr: string,
  exdates: string[] = []              // <-- NEW
): string {
  const startDateTime = DateTime.fromISO(startDate, { zone: zoneId });
  const endDateTime = DateTime.fromISO(endDate, { zone: zoneId });
  const now = DateTime.now().setZone(zoneId);

  // Normalize exdates to ISO with same zone
  const exdateSet = new Set(
    exdates.map(d =>
      DateTime.fromISO(d, { zone: zoneId }).toISO()
    )
  );

  // Helper: bump forward if candidate is in excluded set
  const bumpIfExcluded = (dt: DateTime): DateTime => {
    let candidate = dt;
    while (exdateSet.has(candidate.toISO())) {
      candidate = candidate.plus({ days: 1 });
    }
    return candidate;
  };

  if (startDateTime >= now) {
    return bumpIfExcluded(startDateTime).toISO();
  }

  // Parse RRULE string
  let rruleString = rruleStr?.trim() || '';
  if (rruleString.startsWith('RRULE:')) {
    rruleString = rruleString.slice(6).trim();
  }
  const baseRule = RRule.fromString(rruleString);

  const rrule = new RRule({
    ...baseRule.origOptions,
    dtstart: startDateTime.toJSDate(),
    until: endDateTime.toJSDate()
  });

  // Iterate occurrences
  const occs = rrule.all();
  for (const occ of occs) {
    const occDT = DateTime.fromJSDate(occ).setZone(zoneId);
    if (occDT >= now) {
      return bumpIfExcluded(occDT).toISO();
    }
  }

  return '';
}
