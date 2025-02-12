calculateDuration() {
  if (this.startTime.value && this.endTime.value) {
    const startMinutes = this.convertToMinutes(this.startTime.value);
    const endMinutes = this.convertToMinutes(this.endTime.value);

    let durationMinutes = endMinutes - startMinutes;
    if (durationMinutes < 0) {
      // Handle cases where end time is past midnight (crossing AM/PM)
      durationMinutes += 24 * 60; 
    }

    this.duration.setValue(this.formatDuration(durationMinutes));
  }
}

convertToMinutes(time: string): number {
  const [hourMinSec, period] = time.split(' ');  // Split "11:59:00 PM" -> ["11:59:00", "PM"]
  const [hour, min, sec] = hourMinSec.split(':').map(Number); // Extract "11:59:00" -> [11, 59, 00]

  let totalMinutes = hour * 60 + min; // Convert hour/min to total minutes
  if (period === 'PM' && hour !== 12) totalMinutes += 12 * 60; // Adjust PM values
  if (period === 'AM' && hour === 12) totalMinutes -= 12 * 60; // Midnight case

  return totalMinutes;
}

formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs > 0 ? hrs + ' hr ' : ''}${mins > 0 ? mins + ' min' : ''}`;
}