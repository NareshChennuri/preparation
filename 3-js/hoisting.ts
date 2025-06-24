/*

Rule 1: For variables, only the declaration part is attached to the scope with the default initialization value undefined.
Rule 2: Variables defined with let and const, are not initiated with undefined, they remain un-initialized.
Rule 3: For functions, their whole body gets attached to the scope, unlike variables defined with var .
Rule 4: Functions get attached to the scope first, after that variables get attached.

---------------------------------
console.log(lang); // logs undefined, only declaration is attached to scope.
// with default value undefined.
var lang = 'JS';
---------------------------------
console.log(lang); 
let lang = 'js'; // Uncaught ReferenceError: lang is not defined at <anonymous>:1:13
---------------------------------
console.log(lang); 
const lang = 'js'; // Uncaught ReferenceError: lang is not defined at <anonymous>:1:13
---------------------------------
console.log(show); // Logs function body
console.log(lang); // logs undefined

show(); // logs 'hey'

function show() {
  console.log('hey');
}

var lang = 'js';
---------------------------------

var show = 99;

function show() {
   console.log('show');
}

console.log(show); // logs 99

---------------------------------

getMessage(); // TypeError: getMessage is not a gunction

var getMessage = function() {
  console.log("Hey!");
};

---------------------------------

console.log(message); // f message() { console.log('show')}

var message;

function message() {
   console.log('show');
}

---------------------------------


var a = 1;
function b() {  
  a = 10;  
  return;
  function a() {};
}
b();
console.log(a); // 1


b -> () {
    var a = 10;
}

a -> 1

---------------------------------
*/