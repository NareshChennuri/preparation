/*

Arrow Functions:
---------------------
provides a concise syntax for writing anonymous functions.

const add = (a, b) => a + b;

Let and Const:
---------------------
let and const are block-scoped declarations for variables. let allows reassignment, while const is for constant values.

let y = 20;
const z = 30;

Template Literals:
---------------------
Template literals provide a more flexible and convenient way to concatenate strings.

let name = "John";
console.log(`Hello, ${name}!`);

Destructuring Assignment:
---------------------
Destructuring assignment allows you to extract values from arrays and objects into variables.

let person = { name: "Alice", age: 30 };
let { name, age } = person;


                ##Destructuing Arrays##
            let numbers = [1,2,"3"];
            
            let [a = 'default', b, c, d = "default"] = numbers
            console.log(a); // 1
            
            let [a, ...b] = numbers; // rest parameter
            console.log(b); // [2, "3"];
            
            let [a, , b]// 1 "3" // arrays can be destuctured by the position
            
            //swaping variables with destructuring
            let a = 5;
            let b = 10;
            [b, a] = [a, b];
            console.log(b, a); // 5 10
            
            
            ##Destructuing Objects##
            
            let obj = {
                name: 'Max',
                age: 23,
                greet: function () {
                console.log('yo');
                }
            }
            
            let {name, age} = obj; // 'Max' & 23
            let {name, , greet} = obj; // here we will get error, Here in objects we destructure it by name not by position, names must match for destructuring objects.
            let {name, greet} = obj; //works
            greet(); // yo
            //we can use alias
            let {name, greet: hello} = obj;
            hello(); // yo
            
            Note: in destructuring we are not breaking the arrays/objects, the originals will not be effected.
            
            For destructing the objects you pull out elements by their property name for Arrays you pull out elements by the position

   

Spread and Rest Operators:
---------------------
The spread operator (...) is used for spreading elements, while the rest operator is used for gathering elements into an array.

// Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Rest Operator
const sum = (a, b, ...rest) => a + b + rest.reduce((acc, val) => acc + val, 0);

Map and Set: 
---------------------------
The Map and Set data structures were introduced, providing more powerful alternatives to objects and arrays for certain use cases.

Array Methods: 
---------------------------
ES6 added several new array methods like map, filter, find, forEach, and others, simplifying array manipulation and iteration.


Classes:
---------------------
ES6 introduced a class syntax for creating constructor functions and defining methods.

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

Promises:
---------------------
Promises provide a cleaner way to handle asynchronous operations.

// ES5
function fetchData(callback) {
  setTimeout(function() {
    callback("Data received");
  }, 1000);
}

// ES6
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 1000);
  });
}

Modules:
---------------------
ES6 introduced a standardized module system for organizing and importing/exporting code.

// Exporting
// file: utils.js
export const add = (a, b) => a + b;

// Importing
// file: main.js
import { add } from './utils';

*/