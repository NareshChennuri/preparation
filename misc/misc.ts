const exDateStrings = exDates.map(ex => {
  const date = new Date(ex);
  return date.toISOString().split('T')[0]; // e.g., '2025-06-01'
});

let currentDate = new Date(startDateStr);
const endDate = new Date(endDateStr);

let validDate: Date | null = null;

while (currentDate <= endDate) {
  const currentDateOnly = currentDate.toISOString().split('T')[0];

  if (!exDateStrings.includes(currentDateOnly)) {
    validDate = new Date(currentDate); // found valid date
    break;
  }

  // Move to next day
  currentDate.setUTCDate(currentDate.getUTCDate() + 1);
}