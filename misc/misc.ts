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

function toUTCFormattedString(isoUtcStr: string, region: string): string {
  const timeZone = REGION_TIMEZONE_MAP[region];
  if (!timeZone) throw new Error(`Invalid region: ${region}`);

  // Parse ISO string in UTC, shift to region time zone
  const regionalTime = DateTime.fromISO(isoUtcStr, { zone: 'utc' }).setZone(timeZone);

  if (!regionalTime.isValid) {
    throw new Error('Invalid ISO datetime input');
  }

  // Convert to UTC and return in 'yyyyMMddTHHmmssZ' format
  return regionalTime.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
}


toUTCFormattedString('2025-05-28T08:00:00Z', 'US-EST');