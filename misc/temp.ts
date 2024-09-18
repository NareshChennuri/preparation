function generateRandomVisits(numVisits) {
    const visitsList = [];
    const standardIds = ["ABC123ZD", "DEF456YT", "GHI789XC", "JKL012PA", "MNO345BG", "PQR678VD"];
    
    // Helper function to get a random date within the last 2 months
    function getRandomDateWithinLastTwoMonths() {
      const now = new Date();
      const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
      return new Date(twoMonthsAgo.getTime() + Math.random() * (now.getTime() - twoMonthsAgo.getTime()));
    }
  
    for (let i = 0; i < numVisits; i++) {
      const randomDate = getRandomDateWithinLastTwoMonths();
      const randomStandardId = standardIds[Math.floor(Math.random() * standardIds.length)];
      
      const visit = {
        id: i + 1,
        createdDate: randomDate.toISOString(),
        standardId: randomStandardId
      };
      
      visitsList.push(visit);
    }
    
    return visitsList;
  }
  
  // Generate 100 random visits
  const randomVisits = generateRandomVisits(100);
  
  console.log(randomVisits);
  