function formatDate(isoString) {
  // Convert ISO string to Date object
  let date = new Date(isoString);

  // Convert to locale string with 2-digit formatting
  return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
  });
}

// Example usage
console.log(formatDate("2025-02-27T00:19:26Z")); 
