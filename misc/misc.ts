function formatUtcToLocal(utcDateStr) {
  const date = new Date(utcDateStr);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  };

  // Format the date using the user's local timezone
  const formatted = new Intl.DateTimeFormat('en-US', options).format(date);

  // Remove comma (optional, for cleaner output)
  return formatted.replace(',', '');
}
