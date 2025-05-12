function parseRRuleDate(dateStr: string): Date {
  // Convert '20250601T120000Z' to '2025-06-01T12:00:00Z'
  const isoFormatted = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}T${dateStr.substring(9, 11)}:${dateStr.substring(11, 13)}:00Z`;
  return new Date(isoFormatted);
}

// Usage
const exDates = ['20250601T120000Z'];

const exDateSet = new Set(
  exDates.map(d => parseRRuleDate(d).toISOString().split('T')[0])
);

console.log(exDateSet); // Set { '2025-06-01' }
