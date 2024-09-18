function calculateReturnVisits(visitsList) {
    const today = new Date();
    
    // Helper function to get the start and end of specific months
    const getMonthStartAndEnd = (year, month) => {
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);
      return { startOfMonth, endOfMonth };
    };
    
    // Get start and end of the previous and the month before that
    const { startOfMonth: startOfLastMonth, endOfMonth: endOfLastMonth } = getMonthStartAndEnd(today.getFullYear(), today.getMonth() - 1);
    const { startOfMonth: startOfPrevMonth, endOfMonth: endOfPrevMonth } = getMonthStartAndEnd(today.getFullYear(), today.getMonth() - 2);
  
    // Track standardIds per month
    const lastMonthVisits = {};
    const prevMonthVisits = {};
    
    let totalLastMonthVisits = 0;
    let totalPrevMonthVisits = 0;
    let returnLastMonthVisits = 0;
    let returnPrevMonthVisits = 0;
  
    // Process visits and count return visits for both months
    visitsList.forEach(visit => {
      const visitDate = new Date(visit.createdDate);
      const standardId = visit.standardId;
  
      // For last month
      if (visitDate >= startOfLastMonth && visitDate <= endOfLastMonth) {
        totalLastMonthVisits++;
        if (!lastMonthVisits[standardId]) {
          lastMonthVisits[standardId] = 0;
        }
        lastMonthVisits[standardId]++;
      }
  
      // For the month before last
      if (visitDate >= startOfPrevMonth && visitDate <= endOfPrevMonth) {
        totalPrevMonthVisits++;
        if (!prevMonthVisits[standardId]) {
          prevMonthVisits[standardId] = 0;
        }
        prevMonthVisits[standardId]++;
      }
    });
  
    // Calculate return visits for last month and the month before that
    Object.values(lastMonthVisits).forEach(count => {
      if (count > 1) returnLastMonthVisits += count;
    });
    Object.values(prevMonthVisits).forEach(count => {
      if (count > 1) returnPrevMonthVisits += count;
    });
  
    // Calculate percentage of return visits for last month
    const returnVisitsPercentageLastMonth = totalLastMonthVisits > 0 ? (returnLastMonthVisits / totalLastMonthVisits) * 100 : 0;
    
    // Calculate percentage of return visits for the previous month
    const returnVisitsPercentagePrevMonth = totalPrevMonthVisits > 0 ? (returnPrevMonthVisits / totalPrevMonthVisits) * 100 : 0;
  
    // Check if there is an increase in return visit percentage
    const isIncreased = returnVisitsPercentageLastMonth > returnVisitsPercentagePrevMonth;
  
    return {
      returnVisitsPercentageLastMonth: returnVisitsPercentageLastMonth.toFixed(2),
      isIncreased
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
      "id": 2,
      "createdBy": "ZKJA2IN",
      "createdDate": "2024-08-15T10:20:00Z",
      "modifiedBy": null,
      "modifiedDate": null,
      "standardId": "ZKJA2IN",
      "fullName": "Roopa,Seeri",
      "emailAddress": "roopa.seeri@bofa.com",
      "pageName": "TFGSignup"
    },
    // Add more visits objects here...
  ];
  
  console.log(calculateReturnVisits(visitsList));
  