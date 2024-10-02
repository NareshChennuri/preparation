function calculateVisitsMetrics(visitsList) {
  const today = new Date();
  const yesterdayStart = new Date(today);
  yesterdayStart.setDate(today.getDate() - 1);
  yesterdayStart.setHours(0, 0, 0, 0);
  const yesterdayEnd = new Date(today);
  yesterdayEnd.setDate(today.getDate() - 1);
  yesterdayEnd.setHours(23, 59, 59, 999);

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

  // Helper to pad a number with leading zeros (for date formatting)
  function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  // Helper to get date in YYYY-MM-DD format in local timezone
  function getLocalDateISOString(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
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
    if (visitLocalDate >= yesterdayStart && visitLocalDate <= yesterdayEnd) {
      visitsYesterday++;
    }

    // Compare with same day last month (for percentage change)
    const lastMonthSameDay = new Date(startOfLastMonth);
    lastMonthSameDay.setDate(visitLocalDate.getDate());
    if (visitLocalDate >= yesterdayStart && visitLocalDate <= yesterdayEnd) {
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
      if (visitLocalDate.getDate() <= today.getDate()) {
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
      if (visitLocalDate.getDate() <= today.getDate()) {
        totalPrevVisitsLastMonth++;
        if (!uniquePrevVisitsLastMonth.has(visit.standardId)) {
          uniquePrevVisitsLastMonth.add(visit.standardId);
        }
      }
    }
  });

  // Helper function to convert visits by page to sorted array format with all MTD dates
  function convertToSortedListWithAllDates(visitsByPage, startDate, endDate) {
    const result = {};
    for (const page in visitsByPage) {
      result[page] = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateString = getLocalDateISOString(currentDate);
        const visitsCount = visitsByPage[page][dateString] || 0;
        result[page].push({ createdDate: dateString, visitsCount });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    return result;
  }

  const sortedMTDVisitsByPage = convertToSortedListWithAllDates(visitsMTDByPage, startOfThisMonth, today);
  const sortedLastMonthVisitsByPage = convertToSortedListWithAllDates(visitsLastMonthByPage, startOfLastMonth, endOfLastMonth);
  const sortedUniqueMTDVisitsByPage = convertToSortedListWithAllDates(uniqueMTDVisitsByPage, startOfThisMonth, today);
  const sortedUniqueLastMonthVisitsByPage = convertToSortedListWithAllDates(uniqueLastMonthVisitsByPage, startOfLastMonth, endOfLastMonth);

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

  // Helper function to find the date with most unique visits in last 90 days
  function getMostVisitsLast90Days() {
    const ninetyDaysAgo = new Date(today);
    ninetyDaysAgo.setDate(today.getDate() - 90);

    let mostVisitsDate = null;
    let mostVisitsCount = 0;

    visitsList.forEach(visit => {
      const visitLocalDate = getLocalDate(visit.createdDate);
      if (visitLocalDate >= ninetyDaysAgo && visitLocalDate <= today) {
        if (!mostVisitsDate || uniqueVisitsMTD.size > mostVisitsCount) {
          mostVisitsCount = uniqueVisitsMTD.size;
          mostVisitsDate = visitLocalDate;
        }
      }
    });

    return { date: mostVisitsDate ? getLocalDateISOString(mostVisitsDate) : null, count: mostVisitsCount };
  }

  return {
    yesterday: {
      visitsCount: visitsYesterday,
      percentageChange: percentageChangeYesterday.toFixed(2),
      isIncreased: isIncreasedYesterday
    },
    mtd: {
      visitsCount: totalVisitsMTD,
      percentageChange: percentageChangeMTD.toFixed(2),
      isIncreased: isIncreasedMTD,
      visitsByPage: sortedMTDVisitsByPage
    },
    lastMonth: {
      visitsCount: totalVisitsLastMonth,
      percentageChange: percentageChangeLastMonth.toFixed(2),
      isIncreased: isIncreasedLastMonth,
      visitsByPage: sortedLastMonthVisitsByPage
    },
    mtdUnique: {
      visitsCount: uniqueVisitsMTD.size,
      percentageChange: percentageChangeMTDUnique.toFixed(2),
      isIncreased: isIncreasedMTDUnique,
      visitsByPage: sortedUniqueMTDVisitsByPage
    },
    lastMonthUnique: {
      visitsCount: uniqueVisitsLastMonth.size,
      percentageChange: percentageChangeLastMonthUnique.toFixed(2),
      isIncreased: isIncreasedLastMonthUnique,
      visitsByPage: sortedUniqueLastMonthVisitsByPage
    },
    mostVisitsLast90Days: getMostVisitsLast90Days()
  };
}

// Example usage:
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
