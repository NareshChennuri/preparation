function getUniqueStandardIds(data) {
  const uniqueEntries = new Map();

  data.forEach(entry => {
      const key = `${entry.standardId}-${entry.createdDate}`;
      if (!uniqueEntries.has(key)) {
          uniqueEntries.set(key, { standardId: entry.standardId, createdDate: entry.createdDate });
      }
  });

  return Array.from(uniqueEntries.values());
}

// Example usage
const data = [
  { standardId: "NBKHHDX", createdDate: "2025-03-04", pageName: "TFGSignup" },
  { standardId: "NBKHHDX", createdDate: "2025-03-04", pageName: "TFGCalendar" },
  { standardId: "ZK1MAMS", createdDate: "2025-03-03", pageName: "TFGCalendar" },
  { standardId: "ZK2CA7B", createdDate: "2025-03-04", pageName: "TFGSignup" },
  { standardId: "ZK2CA7B", createdDate: "2025-03-04", pageName: "TFGCalendar" },
  { standardId: "ZK2J6KI", createdDate: "2025-03-03", pageName: "TFGSignup" },
  { standardId: "ZK2J6KI", createdDate: "2025-03-03", pageName: "TFGCalendar" },
  { standardId: "ZK7GGQZ", createdDate: "2025-03-03", pageName: "TFGSignup" },
  { standardId: "ZK7GGQZ", createdDate: "2025-03-03", pageName: "TFGCalendar" },
  { standardId: "ZKJA2IN", createdDate: "2025-03-03", pageName: "TFGSignup" },
  { standardId: "ZKJA2IN", createdDate: "2025-03-03", pageName: "TFGCalendar" },
  { standardId: "ZKNGSHW", createdDate: "2025-03-04", pageName: "TFGSignup" },
  { standardId: "ZKNGSHW", createdDate: "2025-03-04", pageName: "TFGCalendar" },
  { standardId: "ZKS08VZ", createdDate: "2025-03-03", pageName: "TFGSignup" },
  { standardId: "ZKS08VZ", createdDate: "2025-03-03", pageName: "TFGCalendar" },
  { standardId: "ZKW5PJD", createdDate: "2025-03-04", pageName: "TFGSignup" },
  { standardId: "ZKW5PJD", createdDate: "2025-03-04", pageName: "TFGCalendar" },
  { standardId: "ZKXE8R9", createdDate: "2025-03-03", pageName: "TFGSignup" },
  { standardId: "ZKYCUBS", createdDate: "2025-03-03", pageName: "TFGSignup" },
  { standardId: "ZKYCUBS", createdDate: "2025-03-03", pageName: "TFGCalendar" },
  { standardId: "ZKYLBKT", createdDate: "2025-03-03", pageName: "TFGSignup" }
];

console.log(getUniqueStandardIds(data));
