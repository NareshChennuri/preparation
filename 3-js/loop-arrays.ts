/*

For Loop:
============================
The traditional for loop is used to iterate through an array by index.

const array = [1, 2, 3, 4, 5];

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

For...of Loop:
============================
The for...of loop is a more concise and modern way to iterate over the values of an iterable, such as an array.


const array = [1, 2, 3, 4, 5];

for (const element of array) {
  console.log(element);
}

ForEach Method:
============================
The forEach method is available on arrays and allows you to execute a provided function once for each array element.


const array = [1, 2, 3, 4, 5];

array.forEach(function(element) {
  console.log(element);
});

Map Method:
============================
The map method creates a new array by applying a provided function to each element of the original array.

const array = [1, 2, 3, 4, 5];

const newArray = array.map(function(element) {
  return element * 2;
});

console.log(newArray);

Filter Method:
============================
The filter method creates a new array with elements that satisfy a provided function's condition.

const array = [1, 2, 3, 4, 5];

const filteredArray = array.filter(function(element) {
  return element > 2;
});

console.log(filteredArray);

Reduce Method:
============================
The reduce method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.

const array = [1, 2, 3, 4, 5];

const sum = array.reduce(function(accumulator, element) {
  return accumulator + element;
}, 0);

console.log(sum);

*/