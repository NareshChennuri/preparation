function isRecurringEvent(startDateISO: string, endDateISO: string): boolean {
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);

  // Check if they are on the same calendar day (ignoring time)
  const isSameDay =
    startDate.getUTCFullYear() === endDate.getUTCFullYear() &&
    startDate.getUTCMonth() === endDate.getUTCMonth() &&
    startDate.getUTCDate() === endDate.getUTCDate();

  return !isSameDay;
}
