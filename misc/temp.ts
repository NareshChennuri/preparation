// Input array
const inputArray = [
    { standardId: 'ABCE4ID', createdDate: '2024-09-12T00:11:59Z' },
    { standardId: 'ABCE4ID', createdDate: '2024-09-12T00:12:59Z' },
    { standardId: 'ABCE4IE', createdDate: '2024-09-13T00:11:59Z' }
  ];
  
  // Function to transform and remove duplicates
  const removeDuplicates = (arr) => {
    const uniqueSet = new Set();
    return arr.reduce((acc, item) => {
      // Extract only the date part
      const date = item.createdDate.split('T')[0];
      // Create a unique key based on standardId and date
      const uniqueKey = `${item.standardId}|${date}`;
  
      // Check if this combination is already in the Set
      if (!uniqueSet.has(uniqueKey)) {
        uniqueSet.add(uniqueKey);
        acc.push({ standardId: item.standardId, date: date });
      }
      return acc;
    }, []);
  };
  
  // Get the unique array
  const uniqueArray = removeDuplicates(inputArray);
  
  console.log(uniqueArray);
  