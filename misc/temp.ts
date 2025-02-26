function formatDateTime(dateString) {
  // Convert input string to Date object (ignoring 'IST' as it's incorrect in ISO format)
  const date = new Date(dateString.replace(' IST', ''));

  // Extract date components
  const month = date.getMonth() + 1; // Months are 0-based
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Extract last two digits of year
  const hours = date.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits
  const seconds = date.getSeconds().toString().padStart(2, '0'); // Ensure 2 digits
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}

// Example Usage
console.log(formatDateTime("2025-02-27T00:19:26Z IST")); 
