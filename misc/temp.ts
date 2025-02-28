let percentageChange;

  if (monthBeforeLastCount === 0) {
    percentageChange = lastMonthCount > 0 ? 100 : 0; // If lastMonthCount > 0, assume 100% increase, else no change.
  } else {
    percentageChange = ((lastMonthCount - monthBeforeLastCount) / monthBeforeLastCount) * 100;
    percentageChange = parseFloat(percentageChange.toFixed(2)); // Round to 2 decimal places
  }
