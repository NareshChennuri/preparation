function formatTimestamp(isoString) {
  const date = new Date(isoString);

  // Extract date components
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = date.getUTCFullYear();

  // Extract time components (keeping UTC time)
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  // Determine AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12-hour format
  hours = String(hours).padStart(2, '0'); // Ensure two digits

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}

// Example Usage
console.log(formatTimestamp("2025-02-27T19:39:02Z")); // Output: "02/27/2025 07:39:02 PM"
