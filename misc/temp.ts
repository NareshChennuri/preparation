calculatedEndTime(startTime: string, finalMinutes: number): string {
  if (!startTime) return '';

  const startTotalMinutes = this.convertToMinutes(startTime);
  const endTotalMinutes = (startTotalMinutes + finalMinutes) % (24 * 60); // Handle overflow past midnight

  const hours = Math.floor(endTotalMinutes / 60);
  const minutes = endTotalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';

  let formattedHour = hours % 12;
  formattedHour = formattedHour === 0 ? 12 : formattedHour; // Convert 0 to 12 for AM/PM format

  return `${this.formatTime(formattedHour)}:${this.formatTime(minutes)}:00 ${period}`;
}


// Converts time string 'hh:mm:ss A' to total minutes from midnight
convertToMinutes(time: string): number {
  const [hourMinSec, period] = time.split(' ');  
  const [hour, min] = hourMinSec.split(':').map(Number);

  let totalMinutes = hour * 60 + min; 
  if (period === 'PM' && hour !== 12) totalMinutes += 12 * 60;
  if (period === 'AM' && hour === 12) totalMinutes -= 12 * 60;

  return totalMinutes;
}

// Formats number into two-digit time format
formatTime(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}
