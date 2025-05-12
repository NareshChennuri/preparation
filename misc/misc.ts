const updatedExDates = exDates.map(date => date.endsWith('Z') ? date.slice(0, -1) : date);
