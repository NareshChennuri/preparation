function normalizeJsonString(raw: string): string {
  const obj = JSON.parse(raw);

  // Sort exDates array if exists
  if (Array.isArray(obj.exDates)) {
    obj.exDates.sort();
  }

  // Sort keys recursively
  const sortKeys = (input: any): any => {
    if (Array.isArray(input)) {
      return input;
    } else if (input !== null && typeof input === 'object') {
      return Object.keys(input)
        .sort()
        .reduce((sortedObj, key) => {
          sortedObj[key] = sortKeys(input[key]);
          return sortedObj;
        }, {} as Record<string, any>);
    }
    return input;
  };

  const sorted = sortKeys(obj);
  return JSON.stringify(sorted);
}
