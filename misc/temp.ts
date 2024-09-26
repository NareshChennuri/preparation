function splitDateSuffix(dateStr) {
  // Use a regular expression to match the number and its suffix
  let match = dateStr.match(/^(\D*\s\d+)(st|nd|rd|th)$/);

  // If a match is found, return an array with the date and suffix
  if (match) {
      return [match[1], match[2]];
  } else {
      // If no match, return the original string (handle invalid input)
      return [dateStr, ''];
  }
}

// Example usage
let input = 'Sept 16th';
let result = splitDateSuffix(input);
console.log(result); // ['Sept 16', 'th']
