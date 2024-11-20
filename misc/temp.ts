function validateStartAndEndDate(
  startDate: { year: number; month: number; day: number },
  endDate: { year: number; month: number; day: number }
): string | null {
  // Convert start and end dates to JavaScript Date objects
  const start = new Date(startDate.year, startDate.month - 1, startDate.day);
  const end = new Date(endDate.year, endDate.month - 1, endDate.day);

  // Check if the end date is earlier than the start date
  if (end < start) {
    return "Error: End date must be the same or later than the start date.";
  }

  // Return null if validation passes
  return null;
}

// Example usage
const startDate = { year: 2024, month: 12, day: 23 };
const endDate = { year: 2024, month: 11, day: 29 };

const validationResult = validateStartAndEndDate(startDate, endDate);
if (validationResult) {
  console.error(validationResult);
} else {
  console.log("Dates are valid.");
}
