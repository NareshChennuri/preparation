getLastMonthDateRange(): string {
  const today = new Date();

  // Calculate the last month and year
  const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
  const lastMonthYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();

  // Get the start and end of last month
  const startOfLastMonth = new Date(lastMonthYear, lastMonth, 1);
  const endOfLastMonth = new Date(lastMonthYear, lastMonth + 1, 0); // 0 gives the last day of the previous month

  // Define the options with correct type
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  
  // Format the date as "Month DD, YYYY"
  const formattedStart = startOfLastMonth.toLocaleDateString('en-US', options);
  const formattedEnd = endOfLastMonth.toLocaleDateString('en-US', options);
  
  return `${formattedStart} - ${formattedEnd}`;
}
