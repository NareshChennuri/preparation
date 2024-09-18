function calculateReturnVisitStats(visitsList) {
    const today = new Date();
  
    // Helper functions to get start/end of specific time periods
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    
    const startOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const endOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 1, 0);
  
    const countStandardIdOccurrences = (list) => {
      const occurrences = {};
      list.forEach(visit => {
        if (occurrences[visit.standardId]) {
          occurrences[visit.standardId]++;
        } else {
          occurrences[visit.standardId] = 1;
        }
      });
      return occurrences;
    };
  
    const calculateReturnVisitPercentage = (visits, standardIdOccurrences) => {
      const returnVisits = visits.filter(visit => standardIdOccurrences[visit.standardId] > 1);
      return (returnVisits.length / visits.length) * 100;
    };
  
    const filterVisitsByDateRange = (list, startDate, endDate) => {
      return list.filter(visit => {
        const visitDate = new Date(visit.createdDate);
        return visitDate >= startDate && visitDate <= endDate;
      });
    };
  
    // Filter visits for the last month and the month before last
    const lastMonthVisits = filterVisitsByDateRange(visitsList, startOfLastMonth, endOfLastMonth);
    const monthBeforeLastVisits = filterVisitsByDateRange(visitsList, startOfMonthBeforeLast, endOfMonthBeforeLast);
  
    // Count occurrences of each standardId for both time periods
    const lastMonthOccurrences = countStandardIdOccurrences(lastMonthVisits);
    const monthBeforeLastOccurrences = countStandardIdOccurrences(monthBeforeLastVisits);
  
    // Calculate return visit percentages for both time periods
    const lastMonthReturnPercentage = calculateReturnVisitPercentage(lastMonthVisits, lastMonthOccurrences);
    const monthBeforeLastReturnPercentage = calculateReturnVisitPercentage(monthBeforeLastVisits, monthBeforeLastOccurrences);
  
    // Calculate percentage change and whether the return visits increased
    const percentageChange = ((lastMonthReturnPercentage - monthBeforeLastReturnPercentage) / (monthBeforeLastReturnPercentage || 1)) * 100;
    const isIncreased = lastMonthReturnPercentage > monthBeforeLastReturnPercentage;
  
    // Return final results
    return {
      lastMonthReturnPercentage: lastMonthReturnPercentage.toFixed(2),
      isIncreased,
      percentageChange: percentageChange.toFixed(2)
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
  
  console.log(calculateReturnVisitStats(visitsList));
  