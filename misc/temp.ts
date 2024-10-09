getVisitsByPage(visitsList, period) {
  // Helper function to format the date as 'YYYY-MM-DD'
  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  // Get the current date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Calculate the start and end dates based on the period
  let startDate, endDate;
  if (period === 'MTD') {
    startDate = new Date(currentYear, currentMonth, 1);
    endDate = now;
  } else if (period === 'Last Month') {
    startDate = new Date(currentYear, currentMonth - 1, 1);
    endDate = new Date(currentYear, currentMonth, 0); // Last day of the previous month
  }

  // Convert visitsList to a structure with total visits per day by pageName
  const visitsByPage = {};
  visitsList.forEach((visit) => {
    const visitDate = new Date(visit.createdDate);
    const formattedDate = formatDate(visitDate);

    // Filter visits based on the period
    if (period && (visitDate < startDate || visitDate > endDate)) {
      return;
    }

    const pageName = visit.pageName;

    // Initialize the page if not already present
    if (!visitsByPage[pageName]) {
      visitsByPage[pageName] = {};
    }

    // Initialize the visit count for the date if not already present
    if (!visitsByPage[pageName][formattedDate]) {
      visitsByPage[pageName][formattedDate] = 0;
    }

    // Increment the visit count for the date
    visitsByPage[pageName][formattedDate]++;
  });

  // Convert the visitsByPage structure to the desired format
  const result = Object.keys(visitsByPage).map((pageName) => {
    // Get an array of date and count objects, sorted by date
    const visitsArray = Object.keys(visitsByPage[pageName])
      .map((date) => ({
        createdDate: date,
        visitsCount: visitsByPage[pageName][date],
      }))
      .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));

    // Fill in missing dates with 0 visits
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const formattedDate = formatDate(currentDate);
      if (!visitsByPage[pageName][formattedDate]) {
        visitsArray.push({
          createdDate: formattedDate,
          visitsCount: 0,
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Sort the array again after adding 0-count dates
    visitsArray.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));

    return {
      pageName,
      visits: visitsArray,
    };
  });

  return result;
}