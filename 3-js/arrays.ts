/*
#### modifies
array.push(5)//adds element at the end of the array # modifies
array.unshift(1) // adds element at the start of the array # modifies
array.pop()//removes the last element # modifies
array.shift()//removes the first element #modifies

array.slice() ==> (startIndex inclusive, endIndex exclusive)
------------------
Returns a shallow copy of a portion of an array.
const numbers = [1, 2, 3, 4, 5];
const slicedNumbers = numbers.slice(1, 4);
console.log(slicedNumbers); // Output: [2, 3, 4]

array.splice()# modifies (startIndex inclusive, deleteCount, additem1, additem2, ...)
-----------------------------
// Syntax: array.splice(start, deleteCount, item1, item2, ...)

// Adding elements using splice
const myArray = [1, 2, 3, 4, 5];

// Adding elements at index 2 while removing 2 elements
myArray.splice(2, 2, 'a', 'b', 'c');

console.log("Modified Array:", myArray);
// Modified Array: [1, 2, 'a', 'b', 'c', 5]


array.reverse()//arrange the elements in reverse order #modifies

array.concat(arr2)//adds the arr2 elements to the end of array elements, #modifies array, #doesn’t modify arr2

array.join(!);//[a,b,c] to a!b!c #doesn’t modify

array.every((val) => val >= 0) // check all the elements are positive numbers in array
array.some((val) => val >= 0) // check if there is any positive number in array
array.sort() // for sorting
array.find() // to find the element
array.filter() // filter out nonrequired elements
array.map() // to map every element in the array with the modified value
array.reduce() // it will reduce all the array element values into a single value
array.indexOf('apple');
array.lastIndexOf('apple');

Array.from() // Array.from(nodeList);
Array.of() // Array.of(7) ==> [7]
Array.fill() // new Array(5).fill('0') ===> [0,0,0,0,0]
array.flat() // [1,[2,3],[4,[5,6]]].flat() ====> [1,2,3,4,[5,6]]
array.flatMap() // [1,2,3,4].flatMap(x => [x, x*2]) ====> [1,2,2,4,3,6,4,8]
array.reduceRight() // ['a','b','c','d'].reduceRight((acc, val) => acc + '' + val) ===> d c b a
array.copyWithin() // [1,2,3,4,5].copyWithin(-2) ===> [1,2,3,1,2]


// getting total sum of array values using reducer method
let numbers = [1,-1,2,3,4];
const sum = numbers.reduce((accumulator, currentValue) => {
return accumulator + currentValue;
}, 0); // sum will be 9

** if you dont' set the initial value occumulator will point to the first element by default.

//shroter way
const sum = numbers.reduce((acc, val) => acc + val);

//filter out negative numbers
const positiveNumbers = numbers.filter(n => n >= 0); // [1,2,3,4]


//*** find object by id in Array Object list
const personList = [{id: 221, name: 'naresh'}, {id: 532, name: 'rakesh'}];
const person = personList.find(person => person.id === 532);

//** empty an array

let numbers = [1,2,3,4];
let another = numbers;
//sol1:  will empty the array but the other references will hold the array data, that are already assigned
numbers = []
//sol2: it is recommended as it will update the references data also
numbers.length = 0;
//sol3 not so clean
numbers.splice(0, numbers.length); // remove from the index 0 to the length of the array
   

forEach:
========
Executes a provided function once for each array element.

const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function (num) {
  console.log(num);
});

map:
========
Creates a new array by applying a function to each element of the original array.
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.map(function (num) {
  return num * num;
});

console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]

filter:
========
Creates a new array with elements that pass a certain condition.

const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter(function (num) {
  return num % 2 === 0;
});

console.log(evenNumbers); // Output: [2, 4]

reduce:
========
Applies a function against an accumulator and each element in the array to reduce it to a single value.

const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

console.log(sum); // Output: 15

find:
========
Returns the first element in the array that satisfies a provided testing function.

const numbers = [1, 2, 3, 4, 5];

const found = numbers.find(function (num) {
  return num > 2;
});

console.log(found); // Output: 3

indexOf and lastIndexOf:
========
Returns the index of the first/last occurrence of a specified value.

const fruits = ['apple', 'banana', 'orange', 'apple'];

const firstAppleIndex = fruits.indexOf('apple');
const lastAppleIndex = fruits.lastIndexOf('apple');

console.log(firstAppleIndex); // Output: 0
console.log(lastAppleIndex); // Output: 3

slice:
========
Returns a shallow copy of a portion of an array.

const numbers = [1, 2, 3, 4, 5];

const slicedNumbers = numbers.slice(1, 4);

console.log(slicedNumbers); // Output: [2, 3, 4]


*/