function combineVisits(chartData) {
    const combinedData = {};
  
    // Process TFGCalendar array
    chartData.TFGCalendar.forEach(item => {
      const date = item.createdDate;
      combinedData[date] = (combinedData[date] || 0) + item.visitsCount;
    });
  
    // Process TFGSignup array
    chartData.TFGSignup.forEach(item => {
      const date = item.createdDate;
      combinedData[date] = (combinedData[date] || 0) + item.visitsCount;
    });
  
    // Convert combinedData object to an array of objects
    const resultArray = Object.keys(combinedData).map(date => ({
      createdDate: date,
      visitsCount: combinedData[date]
    }));
  
    return resultArray;
  }
  
  // Example usage:
  const chartData = {
    TFGCalendar: [
      { createdDate: '10/01/2024', visitsCount: 4 },
      { createdDate: '10/02/2024', visitsCount: 0 },
      // Add more entries
    ],
    TFGSignup: [
      { createdDate: '10/01/2024', visitsCount: 40 },
      { createdDate: '10/02/2024', visitsCount: 50 },
      // Add more entries
    ]
  };
  
  const combinedResult = combineVisits(chartData);
  console.log(combinedResult);
  