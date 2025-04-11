/*

function that accepts functions as parameters and/or returns a function.
Map, filter, reduce, forEach, sort, find, some & every ... etc




In Javascript, functions can be 
    - assigned to variables 
    - and they can be passed into other functions as parameters 
    - also functions can be returned at the end. 

So, “higher-order function” is a function that accepts functions as parameters and/or returns a function.

some commonly used higher-order functions in JavaScript:

They can help make your code more readable, concise, and maintainable.

map:

The map function is used to transform each element of an array based on a provided function.

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map((num) => num * 2);

filter:

The filter function is used to create a new array with elements that satisfy a certain condition.

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter((num) => num % 2 === 0);

reduce:

The reduce function is used to accumulate the elements of an array into a single value.

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);

forEach:

The forEach function is used to iterate over elements in an array without creating a new array.

const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => console.log(num));

sort:

The sort function is used to sort the elements of an array based on a provided comparison function.

const fruits = ['banana', 'apple', 'orange', 'grape'];
const sortedFruits = fruits.sort((a, b) => a.localeCompare(b));

find:

The find function is used to retrieve the first element in an array that satisfies a given condition.

const numbers = [1, 2, 3, 4, 5];
const found = numbers.find((num) => num > 3);

some and every:

The some function checks if at least one element in the array satisfies a given condition.
The every function checks if all elements in the array satisfy a given condition.

const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some((num) => num % 2 === 0);
const allEven = numbers.every((num) => num % 2 === 0);


These higher-order functions, among others, provide powerful tools for working with arrays in a functional programming style. They can help make your code more readable, concise, and maintainable.

*/