formatTimeObject(time: { hour: number, minute: number, sec: number }): string {
  const formattedHour = time.hour.toString().padStart(2, '0');
  const formattedMinute = time.minute.toString().padStart(2, '0');
  const formattedSecond = time.sec.toString().padStart(2, '0');

  return `${formattedHour}:${formattedMinute}:${formattedSecond}`;
}
