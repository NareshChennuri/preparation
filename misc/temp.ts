function calculateUniqueVisitsMetrics(visitsList) {
  const today = new Date();

  // Helper function to format the date (YYYY-MM-DD)
  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  // Helper functions to get the start of the current and previous periods
  const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  // Initialize counters
  let uniqueMTDCount = 0, uniquePrevMTDCount = 0;
  let uniqueLastMonthCount = 0, uniquePrevMonthCount = 0;

  // Track MTD and Last Month unique visits by page and day
  let uniqueMTDVisitsByPage = {};
  let uniqueLastMonthVisitsByPage = {};

  // Track unique visits to prevent double counting (based on standardId)
  let uniqueMTDVisitors = new Set();
  let uniquePrevMTDVisitors = new Set();
  let uniqueLastMonthVisitors = new Set();
  let uniquePrevMonthVisitors = new Set();

  visitsList.forEach(visit => {
    const visitDate = new Date(visit.createdDate);
    const visitDateString = formatDate(visitDate);

    // MTD Unique Visits
    if (visitDate >= startOfThisMonth && visitDate <= today) {
      if (!uniqueMTDVisitors.has(visit.standardId)) {
        uniqueMTDVisitors.add(visit.standardId);
        uniqueMTDCount++;

        if (!uniqueMTDVisitsByPage[visit.pageName]) {
          uniqueMTDVisitsByPage[visit.pageName] = {};
        }
        if (!uniqueMTDVisitsByPage[visit.pageName][visitDateString]) {
          uniqueMTDVisitsByPage[visit.pageName][visitDateString] = 0;
        }
        uniqueMTDVisitsByPage[visit.pageName][visitDateString]++;
      }
    }

    // Previous MTD Unique Visits (same period last month)
    if (visitDate >= startOfLastMonth && visitDate < startOfThisMonth) {
      const visitDay = visitDate.getDate();
      if (visitDay <= today.getDate()) {
        if (!uniquePrevMTDVisitors.has(visit.standardId)) {
          uniquePrevMTDVisitors.add(visit.standardId);
          uniquePrevMTDCount++;
        }
      }
    }

    // Last Month Unique Visits
    if (visitDate >= startOfLastMonth && visitDate <= endOfLastMonth) {
      if (!uniqueLastMonthVisitors.has(visit.standardId)) {
        uniqueLastMonthVisitors.add(visit.standardId);
        uniqueLastMonthCount++;

        if (!uniqueLastMonthVisitsByPage[visit.pageName]) {
          uniqueLastMonthVisitsByPage[visit.pageName] = {};
        }
        if (!uniqueLastMonthVisitsByPage[visit.pageName][visitDateString]) {
          uniqueLastMonthVisitsByPage[visit.pageName][visitDateString] = 0;
        }
        uniqueLastMonthVisitsByPage[visit.pageName][visitDateString]++;
      }
    }

    // Previous Month Unique Visits (Month before last month)
    const startOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const endOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    if (visitDate >= startOfMonthBeforeLast && visitDate <= endOfMonthBeforeLast) {
      if (!uniquePrevMonthVisitors.has(visit.standardId)) {
        uniquePrevMonthVisitors.add(visit.standardId);
        uniquePrevMonthCount++;
      }
    }
  });

  // Convert MTD and Last Month visits by page to sorted lists
  function convertToSortedList(visitsByPage) {
    const result = {};
    for (const page in visitsByPage) {
      result[page] = Object.keys(visitsByPage[page])
        .sort()
        .map(date => ({
          createdDate: date,
          visitsCount: visitsByPage[page][date]
        }));
    }
    return result;
  }

  const sortedMTDVisits = convertToSortedList(uniqueMTDVisitsByPage);
  const sortedLastMonthVisits = convertToSortedList(uniqueLastMonthVisitsByPage);

  // Calculate percentage changes
  const percentageChangeMTD = ((uniqueMTDCount - uniquePrevMTDCount) / (uniquePrevMTDCount || 1)) * 100;
  const percentageChangeLastMonth = ((uniqueLastMonthCount - uniquePrevMonthCount) / (uniquePrevMonthCount || 1)) * 100;

  // Determine if there's an increase or not
  const isIncreaseMTD = uniqueMTDCount > uniquePrevMTDCount;
  const isIncreaseLastMonth = uniqueLastMonthCount > uniquePrevMonthCount;

  // Return results
  return {
    MTD: {
      uniqueVisitsCount: uniqueMTDCount,
      percentageChange: percentageChangeMTD.toFixed(2),
      isIncrease: isIncreaseMTD,
      uniqueVisitsPerDayByPage: sortedMTDVisits
    },
    lastMonth: {
      uniqueVisitsCount: uniqueLastMonthCount,
      percentageChange: percentageChangeLastMonth.toFixed(2),
      isIncrease: isIncreaseLastMonth,
      uniqueVisitsPerDayByPage: sortedLastMonthVisits
    }
  };
}

// Example usage with your visitsList array
const visitsList = [
  {
    "id": 1,
    "createdBy": "ZKJA2IN",
    "createdDate": "2024-09-12T00:11:59Z",
    "modifiedBy": null,
    "modifiedDate": null,
    "standardId": "ZKJA2IN",
    "fullName": "Roopa,Seeri",
    "emailAddress": "roopa.seeri@bofa.com",
    "pageName": "TFGSignup"
  },
  {
    "id": 1,
    "createdBy": "ABC23DF",
    "createdDate": "2024-08-12T00:11:59Z",
    "modifiedBy": null,
    "modifiedDate": null,
    "standardId": "ABC23DF",
    "fullName": "Dakota, Johnson",
    "emailAddress": "dokota4@gmail.com",
    "pageName": "TFGCalendar"
  }
  // Add more visits objects here...
];

console.log(calculateUniqueVisitsMetrics(visitsList));
