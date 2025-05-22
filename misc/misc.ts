const REGION_TIMEZONE_MAP = {
  'APAC-IST': 'Asia/Kolkata',
  'APAC-SGT': 'Asia/Singapore',
  'EMEA-CET': 'Europe/Paris',
  'EMEA-EET': 'Europe/Bucharest',
  'EMEA-WET': 'Europe/Lisbon',
  'US-CST': 'America/Chicago',
  'US-EST': 'America/New_York',
  'US-PST': 'America/Los_Angeles'
};

/**
 * Check if event is past given a cutoffDays buffer in the region's local time
 * @param {string} startDate - 'YYYY-MM-DD'
 * @param {string} startTime - 'HH:mm:ss'
 * @param {string} regionCode - e.g., 'APAC-IST'
 * @param {number} cutoffDays - how many days before event to consider it "past"
 * @returns {boolean} true if past the cutoff, false otherwise
 */
function isEventPast(startDate, startTime, regionCode, cutoffDays) {
  const tz = REGION_TIMEZONE_MAP[regionCode];
  if (!tz) throw new Error(`Invalid region code: ${regionCode}`);

  // Construct event datetime in ISO format and parse in local time
  const eventDateTimeStr = `${startDate}T${startTime}`;
  const eventDateTime = new Date(`${eventDateTimeStr}`);

  // Add cutoffDays buffer (in milliseconds)
  const cutoffTime = eventDateTime.getTime() - cutoffDays * 24 * 60 * 60 * 1000;

  // Get current time in the target timezone
  const nowUTC = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });

  const parts = formatter.formatToParts(nowUTC);
  const getPart = type => parts.find(p => p.type === type)?.value.padStart(2, '0');
  const localNowStr = `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart('hour')}:${getPart('minute')}:${getPart('second')}`;
  const nowInTZ = new Date(`${localNowStr}`);

  return nowInTZ.getTime() > cutoffTime;
}


const isPast = isEventPast('2025-05-22', '08:00:00', 'APAC-IST', 1);
console.log(isPast ? 'Past cutoff' : 'Upcoming');
