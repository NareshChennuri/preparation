function getTotalVisitsPerDay(visitsList) {
  // Flatten the nested array if needed
  const flatVisits = visitsList.flat();

  // Helper function to format a date as 'YYYY-MM-DD'
  function formatDate(date) {
      return date.toISOString().split('T')[0];
  }

  // Helper function to generate all dates between two dates
  function generateDateRange(startDate, endDate) {
      const dates = [];
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
          dates.push(formatDate(new Date(currentDate)));
          currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
  }

  // Group visits by pageName
  const visitsByPageName = flatVisits.reduce((acc, visit) => {
      const { pageName, createdDate } = visit;
      const formattedDate = formatDate(new Date(createdDate));

      if (!acc[pageName]) {
          acc[pageName] = {};
      }

      // Count visits per date for each pageName
      acc[pageName][formattedDate] = (acc[pageName][formattedDate] || 0) + 1;

      return acc;
  }, {});

  // Get the earliest and latest dates in the visits list
  const allDates = flatVisits.map(visit => new Date(visit.createdDate));
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));

  // Generate the full range of dates
  const dateRange = generateDateRange(minDate, maxDate);

  // Format the output
  const result = {};
  for (const [pageName, visits] of Object.entries(visitsByPageName)) {
      result[pageName] = dateRange.map(date => {
          return {
              createdDate: date,
              visitsCount: visits[date] || 0
          };
      });
  }

  return result;
}

// Example usage
const visitsList = [[
  {
      "id": 2135,
      "createdBy": "ABC123F",
      "createdDate": "2024-10-09T11:13:08Z",
      "emailAddress": "asdfasdf@xyz.com",
      "fullName": "Kora, Kamiti",
      "modifiedBy": null,
      "modifiedDate": "2024-10-09T11:13:08Z",
      "pageName": "TFFCalendar",
      "standardId": "ABC123F"
  },
  {
      "id": 2135,
      "createdBy": "ABD123F",
      "createdDate": "2024-10-09T11:13:08Z",
      "emailAddress": "asdfasdf3@xyz.com",
      "fullName": "Kora, Kamiti",
      "modifiedBy": null,
      "modifiedDate": "2024-10-09T11:13:08Z",
      "pageName": "TFFSignup",
      "standardId": "ABD123F"
  }
]];

console.log(getTotalVisitsPerDay(visitsList));
