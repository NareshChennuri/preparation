// Extract 'T080000Z' from executionStartDateISO
const executionTimePart = executionStartDateISO.split('T')[1].replace(/:/g, '').replace('.000Z', '').replace('Z', '') + 'Z';

// Utility to format date part: YYYYMMDD
const formatDatePart = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}`;
};

// Inside the loop
const occDatePart = formatDatePart(occ);
const occRRuleFormat = `${occDatePart}T${executionTimePart}`;

// Then check:
if (occ > todayUTC && !exDateSet.has(occRRuleFormat)) {
  nextValidDate = occ;
  exDateSet.add(occRRuleFormat);
  break;
}
