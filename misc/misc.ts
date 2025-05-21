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

convertToUTCFromRegion(
  dateStr: string, // '2025-05-28' or '20250528'
  timeStr: string, // '08:00 AM'
  region: string   // e.g., 'US-EST'
): string {
  const timeZone = REGION_TIMEZONE_MAP[region];
  if (!timeZone) {
    throw new Error(`Invalid region: ${region}`);
  }

  // Normalize date format
  const normalizedDate = dateStr.includes('-')
    ? dateStr // already in 'yyyy-MM-dd'
    : `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6)}`;

  // Combine and parse with Luxon using 12-hour format
  const localDateTime = DateTime.fromFormat(`${normalizedDate} ${timeStr}`, 'yyyy-MM-dd hh:mm a', {
    zone: timeZone
  });

  if (!localDateTime.isValid) {
    throw new Error(`Invalid datetime input: ${normalizedDate} ${timeStr}`);
  }

  return localDateTime.toUTC().toISO(); // e.g., "2025-05-28T12:30:00.000Z"
}


const result = this.convertToUTCFromRegion('20250528', '08:00 AM', 'US-EST');
// Result: "2025-05-28T12:00:00.000Z"
