function convertUTCtoET(utcString: string): string {
  // Create a new Date object from the UTC string
  const utcDate = new Date(utcString);

  // Define options for formatting to ET (Eastern Time)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York' // Specify the target time zone as Eastern Time
  };

  // Format the UTC date to ET using toLocaleString
  const formattedDate = utcDate.toLocaleString('en-US', options);

  // Reformat the date string to match "MM/dd/yyyy hh:mm a" format
  const [date, time] = formattedDate.split(', ');
  const [month, day, year] = date.split('/');
  return `${month}/${day}/${year} ${time}`;
}

// Usage example
const result = convertUTCtoET('2024-10-03T20:50:10Z');
console.log(result); // Outputs: "10/03/2024 04:50 PM"
