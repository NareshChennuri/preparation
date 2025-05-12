const startDateStr = '2025-06-01T08:00:00Z';
const exDates = ['20250601T120000Z', '20250602T100000Z']; // Can contain multiple excluded dates

const exDateStrings = exDates.map(ex => {
  const date = new Date(ex);
  return date.toISOString().split('T')[0]; // e.g., '2025-06-01'
});

let nextDate = new Date(startDateStr);

while (exDateStrings.includes(nextDate.toISOString().split('T')[0])) {
  nextDate.setUTCDate(nextDate.getUTCDate() + 1);
}

console.log(nextDate.toISOString()); // ✅ First non-excluded date
