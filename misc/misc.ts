function compareLobs(originalLob, currentLob) {
  // Rule 2: If "All" exists in currentLob → always OK
  if (currentLob.includes("All")) {
    return true;
  }

  // Rule 1 & 3: Check if all originalLob values exist in currentLob
  const missing = originalLob.filter(lob => !currentLob.includes(lob));

  return missing.length === 0;
}