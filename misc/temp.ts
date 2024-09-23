function formatDate(dateString) {
  const date = new Date(dateString);
  
  // Array of month names
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
  const day = date.getDate();
  const month = monthNames[date.getMonth()]; // Get month name
  const daySuffix = getDaySuffix(day); // Get proper day suffix (st, nd, rd, th)

  return `${month} ${day}${daySuffix}`;
}

// Helper function to get the day suffix
function getDaySuffix(day) {
  if (day > 3 && day < 21) return 'th'; // Handles 11th to 19th
  switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
  }
}

const formattedDate = formatDate("2024-09-16");
console.log(formattedDate);  // Output: "Sept 16th"
