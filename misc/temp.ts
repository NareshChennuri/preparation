function calculateVisitsMetrics(visitsList) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  // Helper to format the date (YYYY-MM-DD)
  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  // Helper to get local date from UTC string
  function getLocalDate(utcDateString) {
    const utcDate = new Date(utcDateString);
    return new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
  }

  let visitsYesterday = 0, prevVisitsYesterday = 0;
  let totalVisitsMTD = 0, totalPrevVisitsMTD = 0;
  let totalVisitsLastMonth = 0, totalPrevVisitsLastMonth = 0;

  let uniqueVisitsMTD = new Set(), uniquePrevVisitsMTD = new Set();
  let uniqueVisitsLastMonth = new Set(), uniquePrevVisitsLastMonth = new Set();

  let visitsMTDByPage = {}, uniqueMTDVisitsByPage = {};
  let visitsLastMonthByPage = {}, uniqueLastMonthVisitsByPage = {};

  visitsList.forEach(visit => {
    const visitLocalDate = getLocalDate(visit.createdDate);
    const visitDateString = formatDate(visitLocalDate);

    // 1) Yesterday's visits count
    if (visitLocalDate.toDateString() === yesterday.toDateString()) {
      visitsYesterday++;
    }

    // Compare with same day last month (for percentage change)
    const visitDay = visitLocalDate.getDate();
    const lastMonthSameDay = new Date(startOfLastMonth);
    lastMonthSameDay.setDate(visitDay);
    if (lastMonthSameDay.toDateString() === yesterday.toDateString()) {
      prevVisitsYesterday++;
    }

    // 2) MTD visits count
    if (visitLocalDate >= startOfThisMonth && visitLocalDate <= today) {
      totalVisitsMTD++;
      if (!visitsMTDByPage[visit.pageName]) visitsMTDByPage[visit.pageName] = {};
      if (!visitsMTDByPage[visit.pageName][visitDateString]) visitsMTDByPage[visit.pageName][visitDateString] = 0;
      visitsMTDByPage[visit.pageName][visitDateString]++;

      if (!uniqueVisitsMTD.has(visit.standardId)) {
        uniqueVisitsMTD.add(visit.standardId);
        if (!uniqueMTDVisitsByPage[visit.pageName]) uniqueMTDVisitsByPage[visit.pageName] = {};
        if (!uniqueMTDVisitsByPage[visit.pageName][visitDateString]) uniqueMTDVisitsByPage[visit.pageName][visitDateString] = 0;
        uniqueMTDVisitsByPage[visit.pageName][visitDateString]++;
      }
    }

    // Previous month same MTD period
    if (visitLocalDate >= startOfLastMonth && visitLocalDate < startOfThisMonth) {
      if (visitDay <= today.getDate()) {
        totalPrevVisitsMTD++;
        if (!uniquePrevVisitsMTD.has(visit.standardId)) {
          uniquePrevVisitsMTD.add(visit.standardId);
        }
      }
    }

    // 3) Last Month visits count
    if (visitLocalDate >= startOfLastMonth && visitLocalDate <= endOfLastMonth) {
      totalVisitsLastMonth++;
      if (!visitsLastMonthByPage[visit.pageName]) visitsLastMonthByPage[visit.pageName] = {};
      if (!visitsLastMonthByPage[visit.pageName][visitDateString]) visitsLastMonthByPage[visit.pageName][visitDateString] = 0;
      visitsLastMonthByPage[visit.pageName][visitDateString]++;

      if (!uniqueVisitsLastMonth.has(visit.standardId)) {
        uniqueVisitsLastMonth.add(visit.standardId);
        if (!uniqueLastMonthVisitsByPage[visit.pageName]) uniqueLastMonthVisitsByPage[visit.pageName] = {};
        if (!uniqueLastMonthVisitsByPage[visit.pageName][visitDateString]) uniqueLastMonthVisitsByPage[visit.pageName][visitDateString] = 0;
        uniqueLastMonthVisitsByPage[visit.pageName][visitDateString]++;
      }
    }

    // Compare with the month before last month
    const monthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const endOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    if (visitLocalDate >= monthBeforeLast && visitLocalDate <= endOfMonthBeforeLast) {
      totalPrevVisitsLastMonth++;
      if (!uniquePrevVisitsLastMonth.has(visit.standardId)) {
        uniquePrevVisitsLastMonth.add(visit.standardId);
      }
    }
  });

  // Helper function to convert visits by page to sorted array format
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

  const sortedMTDVisitsByPage = convertToSortedList(visitsMTDByPage);
  const sortedLastMonthVisitsByPage = convertToSortedList(visitsLastMonthByPage);
  const sortedUniqueMTDVisitsByPage = convertToSortedList(uniqueMTDVisitsByPage);
  const sortedUniqueLastMonthVisitsByPage = convertToSortedList(uniqueLastMonthVisitsByPage);

  // Calculate percentage changes
  const percentageChangeYesterday = ((visitsYesterday - prevVisitsYesterday) / (prevVisitsYesterday || 1)) * 100;
  const percentageChangeMTD = ((totalVisitsMTD - totalPrevVisitsMTD) / (totalPrevVisitsMTD || 1)) * 100;
  const percentageChangeLastMonth = ((totalVisitsLastMonth - totalPrevVisitsLastMonth) / (totalPrevVisitsLastMonth || 1)) * 100;

  const percentageChangeMTDUnique = ((uniqueVisitsMTD.size - uniquePrevVisitsMTD.size) / (uniquePrevVisitsMTD.size || 1)) * 100;
  const percentageChangeLastMonthUnique = ((uniqueVisitsLastMonth.size - uniquePrevVisitsLastMonth.size) / (uniquePrevVisitsLastMonth.size || 1)) * 100;

  // Determine if there's an increase
  const isIncreasedYesterday = visitsYesterday > prevVisitsYesterday;
  const isIncreasedMTD = totalVisitsMTD > totalPrevVisitsMTD;
  const isIncreasedLastMonth = totalVisitsLastMonth > totalPrevVisitsLastMonth;

  const isIncreasedMTDUnique = uniqueVisitsMTD.size > uniquePrevVisitsMTD.size;
  const isIncreasedLastMonthUnique = uniqueVisitsLastMonth.size > uniquePrevVisitsLastMonth.size;

  // Return the results
  return {
    yesterday: {
      visitsCount: visitsYesterday,
      percentageChange: percentageChangeYesterday.toFixed(2),
      isIncreased: isIncreasedYesterday
    },
    MTD: {
      visitsCount: totalVisitsMTD,
      percentageChange: percentageChangeMTD.toFixed(2),
      isIncreased: isIncreasedMTD,
      visitsPerDayByPage: sortedMTDVisitsByPage,
      uniqueVisitsCount: uniqueVisitsMTD.size,
      percentageChangeUnique: percentageChangeMTDUnique.toFixed(2),
      isIncreasedUnique: isIncreasedMTDUnique,
      uniqueVisitsPerDayByPage: sortedUniqueMTDVisitsByPage
    },
    lastMonth: {
      visitsCount: totalVisitsLastMonth,
      percentageChange: percentageChangeLastMonth.toFixed(2),
      isIncreased: isIncreasedLastMonth,
      visitsPerDayByPage: sortedLastMonthVisitsByPage,
      uniqueVisitsCount: uniqueVisitsLastMonth.size,
      percentageChangeUnique: percentageChangeLastMonthUnique.toFixed(2),
      isIncreasedUnique: isIncreasedLastMonthUnique,
      uniqueVisitsPerDayByPage: sortedUniqueLastMonthVisitsByPage
    }
  };
}

// Example usage
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
];

console.log(calculateVisitsMetrics(visitsList));
