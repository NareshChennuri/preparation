function convertToISOFormat(data) {
  // Helper function to pad single digits with leading zeros
  const padZero = (num) => num.toString().padStart(2, '0');

  // Constructing the start date-time string
  const startDate = `${data.executionStartDate.year}-${padZero(data.executionStartDate.month)}-${padZero(data.executionStartDate.day)}`;
  const startTime = `${padZero(data.executionStartTime.hour)}:${padZero(data.executionStartTime.minute)}:${padZero(data.executionStartTime.second)}`;
  const executionStartDate = `${startDate}T${startTime}Z`; // Assuming UTC ('Z')

  // Constructing the end date-time string
  const endDate = `${data.executionEndDate.year}-${padZero(data.executionEndDate.month)}-${padZero(data.executionEndDate.day)}`;
  const endTime = `${padZero(data.executionEndTime.hour)}:${padZero(data.executionEndTime.minute)}:${padZero(data.executionEndTime.second)}`;
  const executionEndDate = `${endDate}T${endTime}Z`; // Assuming UTC ('Z')

  // Returning the result
  return {
    executionStartDate,
    executionEndDate
  };
}

// Example usage
const jsonData = {
  "executionStartDate": { "year": 2024, "month": 4, "day": 17 },
  "executionEndDate": { "year": 2024, "month": 4, "day": 30 },
  "executionStartTime": { "hour": 0, "minute": 0, "second": 0, "timeMeridian": null },
  "executionEndTime": { "hour": 23, "minute": 0, "second": 0, "timeMeridian": null }
};

console.log(convertToISOFormat(jsonData));
// Output: { executionStartDate: "2024-04-17T00:00:00Z", executionEndDate: "2024-04-30T23:00:00Z" }
