/*

in JavaScript async & await are used for handling asynchronous operations,  especially when we are using Promises.

When you add 'Async' keyword to the function, 
it marks the function as asynchronous.
and it allows the use of 'Await' within the function.

Await Pauses the execution of an async function 
  - until a Promise is settled.
  - Once the Promise is resolved it will return the result.

Advantages of using Async & Await is mainly;

- Readability (looks more like synchronous)
- Simplicity 
- Error Handling (try catch blocks)
- Sequential Execution 
- Avoid callback Hell (more linear and structured manner)
- easier debugging (clear stack trace)
- you can use async function with 
  control flows like if for while

-------------------------------------------------------------------  
// promise
const timerPromise = ((message) => {
  new Promise((resolve) => setTimeout(resolve, 3000, message));
});

async function asyncFunc() {
  const result = await timerPromise("promise finished!");
  console.log(result);
}
-------------------------------------------------------------------  


-------------------------------------------------------------------  

// With chaining
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((result) => console.log(result));

// with async  
async function fetchResource() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Operation finished!");
  }
}

-------------------------------------------------------------------  

Error Handling:
  - Use try/catch blocks to handle errors in async functions.
  - Allows for more synchronous-looking error handling in asynchronous code.

Sequencing Asynchronous Operations:
  - Helps to avoid nested callbacks or "callback hell".
  - Allows asynchronous code to be written in a more sequential manner.

Improves Readability:
  - Makes asynchronous code easier to read and understand.
  - Reduces the complexity of handling asynchronous operations.

Concurrency Control:
  - Helps manage concurrent asynchronous operations.
  - Enables better control over the order and timing of operations.




Async
============
When you add "async" keyword before a function, the function will always return a promise.

async function example() {
	// Return a value
}
example();
o/p : *Promise {<fulfilled>: undefined}*

From the code example, you can see that the function returns a promise with a value undefined. This is because anything the async function returns will be the resolved value of the resulting promise. In this case, the function does not return anything, hence undefined.

async function example() {
  return "Feels good to be an async function";
}
example();
o/p: *Promise {<fulfilled>: "Feels good to be an async function"}*

Await
=========
we need to place the Await keyword before a promise. 
It is an indicator for the async function to pause execution until that promise is settled.
It is similar to the .then() method which makes sure a promise is ‘fulfilled’ or ‘rejected’ before it continues. 
Note that you can only use the await keyword inside an async function.


// Output on the Console after 3 seconds
// promise finished!

Using the await keyword before a promise will produce the resolved value of that promise. It is evident from the line const result = await promise('promise finished!') where  result becomes a string and not a new promise. This is different from .then() which always returns a new promise.

With await, you can break up any chain of promises, and grab their resolve values. The following example uses the fetch() function—which is a promise—to show eliminating chaining with async/await.

// With chaining
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((result) => console.log(result));

// Output on the console

// Array(10) [...]

// Without chaining
async function fetchResource(url) {
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
}
fetchResource("https://jsonplaceholder.typicode.com/users");

// Output on the console

// Array(10) [...]
In the end, it boils down to preference and choice. If you prefer the chaining syntax, then go for it. If you prefer your code to look synchronous and want to use async/await, then that is fine too.

You can also use both syntaxes together, chaining promises inside an async function. It all depends on what you want to achieve and the style you prefer.

How to Handle Errors in Async/Await
Just like with the normal promise syntax, you can catch errors properly using async/await. Properly handling errors in async calls is extremely important to track bugs. Use try/catch blocks to do this.

try is a JavaScript keyword that wraps a block of code. As that block of code runs, try checks for errors. No error can escape a try block. Use try inside an async function.

The first error inside the try block stops the other instructions in that block from executing, try then passes the error value to the catch block. The catch block is similar to .catch() in promises. Just like the promise method, it is a function of an error.

async function fetchResource(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
In this example, the catch keyword has an error, which logs to the console. A settled promise with an uncaught error results in a rejected promise. Make sure you wrap your code in try/catch blocks to have more control over failures and faults in your program.

Also, just like the .finally() method for promises, you can use a finally block inside an async function. Braces that follow this keyword wrap around a block of code that would run regardless of if there is an error or not.

async function fetchResource(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Operation finished!");
  }
}
The use of the finally block is similar to the use of the .finally() method. This just proves that using an async function is a recent way to work with promises.

*/