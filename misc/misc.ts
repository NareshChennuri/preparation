import { DateTime } from 'luxon';

const REGION_TIMEZONE_MAP: Record<string, string> = {
  'APAC-IST': 'Asia/Kolkata',
  'APAC-SGT': 'Asia/Singapore',
  'EMEA-CET': 'Europe/Paris',
  'EMEA-EET': 'Europe/Bucharest',
  'EMEA-WET': 'Europe/Lisbon',
  'US-CST': 'America/Chicago',
  'US-EST': 'America/New_York',
  'US-PST': 'America/Los_Angeles'
};

convertToUTCFromRegion(dateStr: string, timeStr: string, region: string): string {
  const timeZone = REGION_TIMEZONE_MAP[region];

  if (!timeZone) {
    throw new Error(`Invalid region: ${region}`);
  }

  // Parse using the given region's time zone
  const localDateTime = DateTime.fromFormat(`${dateStr} ${timeStr}`, 'yyyy-MM-dd HH:mm', { zone: timeZone });

  if (!localDateTime.isValid) {
    throw new Error('Invalid date or time format');
  }

  const utcDateTime = localDateTime.toUTC();
  return utcDateTime.toISO(); // e.g. "2025-05-21T09:00:00.000Z"
}

const utcDate = this.convertToUTCFromRegion('2025-05-21', '14:30', 'US-EST');
console.log(utcDate); // "2025-05-21T18:30:00.000Z"
