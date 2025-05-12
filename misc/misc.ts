const isoDate = '2025-05-13T08:00:00Z';
const date = new Date(isoDate);

const options = {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

const formatted = date.toLocaleString('en-US', options);
console.log(formatted); // "05/13/2025, 08:00 AM"
