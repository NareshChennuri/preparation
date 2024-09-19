function calculateVisitsMetrics(visitsList) {
  const today = new Date();

  // Helper function to format the date (YYYY-MM-DD)
  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  // Helper functions to get start of specific time periods
  const startOfYesterday = new Date(today);
  startOfYesterday.setDate(today.getDate() - 1);
  startOfYesterday.setHours(0, 0, 0, 0);

  const endOfYesterday = new Date(today);
  endOfYesterday.setDate(today.getDate() - 1);
  endOfYesterday.setHours(23, 59, 59, 999);

  const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  // Initialize counters
  let yesterdayCount = 0, dayBeforeYesterdayCount = 0;
  let mtdCount = 0, prevMTDCount = 0;
  let lastMonthCount = 0, prevMonthCount = 0;

  // Track MTD and Last Month visits by page and day
  let mtdVisitsByPage = {};
  let lastMonthVisitsByPage = {};

  visitsList.forEach(visit => {
    const visitDate = new Date(visit.createdDate);
    const visitDateString = formatDate(visitDate);

    // Calculate Yesterday Visits
    if (visitDate >= startOfYesterday && visitDate <= endOfYesterday) {
      yesterdayCount++;
    }

    // Calculate Day Before Yesterday Visits
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 2);
    if (visitDate >= dayBeforeYesterday && visitDate < startOfYesterday) {
      dayBeforeYesterdayCount++;
    }

    // Calculate MTD Visits
    if (visitDate >= startOfThisMonth && visitDate <= today) {
      mtdCount++;
      if (!mtdVisitsByPage[visit.pageName]) {
        mtdVisitsByPage[visit.pageName] = {};
      }
      if (!mtdVisitsByPage[visit.pageName][visitDateString]) {
        mtdVisitsByPage[visit.pageName][visitDateString] = 0;
      }
      mtdVisitsByPage[visit.pageName][visitDateString]++;
    }

    // Calculate Previous MTD (same period last month)
    if (visitDate >= startOfLastMonth && visitDate < startOfThisMonth) {
      const visitDay = visitDate.getDate();
      if (visitDay <= today.getDate()) {
        prevMTDCount++;
      }
    }

    // Calculate Last Month Visits
    if (visitDate >= startOfLastMonth && visitDate <= endOfLastMonth) {
      lastMonthCount++;
      if (!lastMonthVisitsByPage[visit.pageName]) {
        lastMonthVisitsByPage[visit.pageName] = {};
      }
      if (!lastMonthVisitsByPage[visit.pageName][visitDateString]) {
        lastMonthVisitsByPage[visit.pageName][visitDateString] = 0;
      }
      lastMonthVisitsByPage[visit.pageName][visitDateString]++;
    }

    // Calculate Previous Month Visits (Month before last month)
    const startOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const endOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    if (visitDate >= startOfMonthBeforeLast && visitDate <= endOfMonthBeforeLast) {
      prevMonthCount++;
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

  const sortedMTDVisits = convertToSortedList(mtdVisitsByPage);
  const sortedLastMonthVisits = convertToSortedList(lastMonthVisitsByPage);

  // Calculate percentage changes
  const percentageChangeYesterday = ((yesterdayCount - dayBeforeYesterdayCount) / (dayBeforeYesterdayCount || 1)) * 100;
  const percentageChangeMTD = ((mtdCount - prevMTDCount) / (prevMTDCount || 1)) * 100;
  const percentageChangeLastMonth = ((lastMonthCount - prevMonthCount) / (prevMonthCount || 1)) * 100;

  // Determine if there's an increase or not
  const isIncreaseYesterday = yesterdayCount > dayBeforeYesterdayCount;
  const isIncreaseMTD = mtdCount > prevMTDCount;
  const isIncreaseLastMonth = lastMonthCount > prevMonthCount;

  // Return results
  return {
    yesterday: {
      count: yesterdayCount,
      percentageChange: percentageChangeYesterday.toFixed(2),
      isIncrease: isIncreaseYesterday
    },
    MTD: {
      count: mtdCount,
      percentageChange: percentageChangeMTD.toFixed(2),
      isIncrease: isIncreaseMTD,
      visitsPerDayByPage: sortedMTDVisits
    },
    lastMonth: {
      count: lastMonthCount,
      percentageChange: percentageChangeLastMonth.toFixed(2),
      isIncrease: isIncreaseLastMonth,
      visitsPerDayByPage: sortedLastMonthVisits
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

console.log(calculateVisitsMetrics(visitsList));
