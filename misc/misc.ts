function getUTCFromLocalNow(region: string): string {
  const timeZone = REGION_TIMEZONE_MAP[region];
  if (!timeZone) throw new Error(`Invalid region: ${region}`);

  // Step 1: Get current date in given region
  const localNow = DateTime.now().setZone(timeZone);

  // Step 2: Convert that to UTC
  return localNow.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
}