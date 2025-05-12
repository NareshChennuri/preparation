function formatToLocalTimeString(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  };

  // Format according to the user's local time zone
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);

  const map: any = {};
  parts.forEach(p => map[p.type] = p.value);

  return `${map.month}/${map.day}/${map.year} ${map.hour}:${map.minute} ${map.dayPeriod} ${map.timeZoneName}`;
}

// Example usage
const input = 'Tue May 13 2025 04:00:00 GMT-0400';
const output = formatToLocalTimeString(input);
console.log(output); // → e.g., '05/13/2025 04:00 AM EDT' or based on user's time zone
