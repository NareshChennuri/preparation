// Input array
const inputArray = [
    { standardId: 'ABCE4ID', createdDate: '2024-09-12T00:11:59Z', pageName: 'TFGSignup' },
    { standardId: 'ABCE4ID', createdDate: '2024-09-12T00:12:59Z', pageName: 'TFGCalendar' },
    { standardId: 'ABCE4IE', createdDate: '2024-09-13T00:11:59Z', pageName: 'TFGCalendar' },
    { standardId: 'ABCE4ID', createdDate: '2024-09-12T00:11:59Z', pageName: 'TFGSignup' }
  ];
  
  // Function to group and count visits by date
  const groupByPageNameAndDate = (arr) => {
    const result = {};
  
    arr.forEach(item => {
      const date = item.createdDate.split('T')[0];
      const pageName = item.pageName;
  
      // Initialize the pageName group if not already present
      if (!result[pageName]) {
        result[pageName] = {};
      }
  
      // Initialize the date counter within the pageName group if not already present
      if (!result[pageName][date]) {
        result[pageName][date] = 0;
      }
  
      // Increment the count for this date under this pageName
      result[pageName][date]++;
    });
  
    // Transform the result into the desired format
    return Object.keys(result).map(pageName => {
      const dateEntries = Object.keys(result[pageName]).map(date => ({
        date: date,
        visitsCount: result[pageName][date]
      }));
  
      return {
        [pageName]: dateEntries
      };
    });
  };
  
  // Get the aggregated output
  const aggregatedOutput = groupByPageNameAndDate(inputArray);
  
  console.log(aggregatedOutput);
  