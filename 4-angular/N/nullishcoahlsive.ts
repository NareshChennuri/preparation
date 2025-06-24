/*

provide a default value only when the value is null or undefined
while still allowing 0, false, or empty strings as valid inputs

“The ?? operator returns the right value only when the left value is null or undefined.
It’s useful for giving a default value while still allowing 0, false, or empty strings as valid inputs—unlike the || operator, which treats all ‘falsy’ values the same.”


let count = 0;

let result1 = count || 10; // result1 is 10 (because 0 is "falsy")
let result2 = count ?? 10; // result2 is 0   (because 0 is NOT null/undefined)

let username = null;

let name1 = username || "Guest"; // name1 is "Guest"
let name2 = username ?? "Guest"; // name2 is "Guest"

let userInput = '';

let val1 = userInput || 'default'; // val1 is 'default' (because '' is "falsy")
let val2 = userInput ?? 'default'; // val2 is '' (because '' is not null/undefined)


*/