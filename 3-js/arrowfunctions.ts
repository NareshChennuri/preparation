/*
Arrow functions has a 
- shorter syntax
- implicit return - when you use with single statement 
  it automatically returns the result
  no need of return keyword.
- do not have their own 'this' context unlike tranditional functions.
- especially useful working with callbacks, closures.

- dis adv 
  - no 'arguments' keyword
  - you can't use it as Constructor
  - no this binding - they have lexical scoping 
    this value comes from the enclosing scope 
  - potential readability issues

Concise Syntax:
---------------------------
Arrow functions have a shorter syntax compared to traditional function expressions, making the code more concise and readable. This is especially useful for small, inline functions.

// Traditional function expression
const add = function(x, y) {
  return x + y;
};

// Arrow function
const add = (x, y) => x + y;

Implicit Return:
---------------------------
Arrow functions with a single statement automatically return the result of that statement without needing an explicit return keyword. This is particularly handy for short, one-line functions.

// Traditional function expression
const multiply = function(x, y) {
  return x * y;
};

// Arrow function with implicit return
const multiply = (x, y) => x * y;

Lexical this Binding:
---------------------------
Arrow functions do not have their own this context. Instead, they inherit the this value from the enclosing scope. This behavior can be advantageous when working with callbacks or functions within functions, eliminating the need for workarounds like var self = this; commonly used with traditional functions.

function Counter() {
  this.count = 0;

  // Traditional function expression with explicit binding
  // const self = this;
  // setInterval(function() { self.count++; console.log(self.count); }, 1000);

  // Arrow function with lexical this binding
  setInterval(() => {
    this.count++;
    console.log(this.count);
  }, 1000);
}

const counter = new Counter();

No "arguments" Object with arrow functions:
--------------------------------------------
Arrow functions do not have their own arguments object. Instead, they inherit the arguments from the enclosing scope. Traditional functions have their own arguments object, but arrow functions do not, which can be either an advantage or a limitation depending on the use case.

// Traditional function expression with arguments
const traditionalFunction = function() {
  console.log(arguments);
};

// Arrow function inheriting arguments
const arrowFunction = () => {
  console.log(arguments); // ReferenceError: arguments is not defined
};

It's important to note that while arrow functions offer concise syntax and useful features, they may not be suitable for all scenarios. Traditional function expressions still have their place, especially in cases where the lexical scoping of this or the presence of the arguments object is needed. Choosing between arrow functions and traditional functions depends on the specific requirements of the code you are writing.

*/