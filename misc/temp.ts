function calculateVisitStats(visitsList) {
    const today = new Date();
    
    // Helper functions to get start/end of specific time periods
    const startOfYesterday = new Date(today);
    startOfYesterday.setDate(today.getDate() - 1);
    startOfYesterday.setHours(0, 0, 0, 0);
    
    const endOfYesterday = new Date(today);
    endOfYesterday.setDate(today.getDate() - 1);
    endOfYesterday.setHours(23, 59, 59, 999);
    
    const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    
    // For calculating same period last month
    const startOfPrevMTD = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    
    let yesterdayCount = 0, dayBeforeYesterdayCount = 0;
    let mtdCount = 0, prevMTDCount = 0;
    let lastMonthCount = 0, prevMonthCount = 0;
  
    const mtdVisitsPerDay = {};
    const lastMonthVisitsPerDay = {};
  
    visitsList.forEach(visit => {
      const visitDate = new Date(visit.createdDate);
      const visitDay = visitDate.toISOString().split('T')[0]; // Get only the date part
  
      // Yesterday visit counts
      if (visitDate >= startOfYesterday && visitDate <= endOfYesterday) {
        yesterdayCount++;
      }
  
      // Day before yesterday visit counts
      const startOfDayBeforeYesterday = new Date(startOfYesterday);
      startOfDayBeforeYesterday.setDate(startOfYesterday.getDate() - 1);
      if (visitDate >= startOfDayBeforeYesterday && visitDate < startOfYesterday) {
        dayBeforeYesterdayCount++;
      }
  
      // MTD visit counts
      if (visitDate >= startOfThisMonth && visitDate <= today) {
        mtdCount++;
        
        // Track visits per day for MTD
        if (!mtdVisitsPerDay[visitDay]) {
          mtdVisitsPerDay[visitDay] = 0;
        }
        mtdVisitsPerDay[visitDay]++;
      }
  
      // Last Month visit counts
      if (visitDate >= startOfLastMonth && visitDate <= endOfLastMonth) {
        lastMonthCount++;
  
        // Track visits per day for last month
        if (!lastMonthVisitsPerDay[visitDay]) {
          lastMonthVisitsPerDay[visitDay] = 0;
        }
        lastMonthVisitsPerDay[visitDay]++;
      }
  
      // Previous MTD visit counts (same days last month)
      if (visitDate >= startOfPrevMTD && visitDate < startOfThisMonth) {
        if (visitDay <= today.getDate()) {
          prevMTDCount++;
        }
      }
  
      // Previous month's visit counts
      const startOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 2, 1);
      const endOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 1, 0);
      if (visitDate >= startOfMonthBeforeLast && visitDate <= endOfMonthBeforeLast) {
        prevMonthCount++;
      }
    });
  
    // Calculate percentage changes
    const percentageChangeYesterday = ((yesterdayCount - dayBeforeYesterdayCount) / (dayBeforeYesterdayCount || 1)) * 100;
    const percentageChangeMTD = ((mtdCount - prevMTDCount) / (prevMTDCount || 1)) * 100;
    const percentageChangeLastMonth = ((lastMonthCount - prevMonthCount) / (prevMonthCount || 1)) * 100;
  
    // Determine if there's an increase or not
    const isIncreaseYesterday = yesterdayCount > dayBeforeYesterdayCount;
    const isIncreaseMTD = mtdCount > prevMTDCount;
    const isIncreaseLastMonth = lastMonthCount > prevMonthCount;
  
    // Convert visits per day into an array of objects
    const mtdVisitsArray = Object.keys(mtdVisitsPerDay).map(date => ({
      createdDate: date,
      visitsCount: mtdVisitsPerDay[date]
    }));
  
    const lastMonthVisitsArray = Object.keys(lastMonthVisitsPerDay).map(date => ({
      createdDate: date,
      visitsCount: lastMonthVisitsPerDay[date]
    }));
  
    // Return final results
    return {
      yesterday: {
        count: yesterdayCount,
        percentageChange: percentageChangeYesterday.toFixed(2),
        isIncreased: isIncreaseYesterday
      },
      MTD: {
        count: mtdCount,
        percentageChange: percentageChangeMTD.toFixed(2),
        isIncreased: isIncreaseMTD,
        visitsPerDay: mtdVisitsArray
      },
      lastMonth: {
        count: lastMonthCount,
        percentageChange: percentageChangeLastMonth.toFixed(2),
        isIncreased: isIncreaseLastMonth,
        visitsPerDay: lastMonthVisitsArray
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
    }
    // Add more visits objects here...
  ];
  
  console.log(calculateVisitStats(visitsList));
  