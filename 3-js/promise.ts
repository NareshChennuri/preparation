/*

A Promise is a way to handle asynchronous operations 
— like data fetching, timers, or API calls — in a cleaner and more manageable way.

Think of a Promise like a restaurant order:

You place an order (start an async task).
You get a token (Promise) that says “I’ll let you know when it’s ready.” --> Pending State

Later, your order is either:
Fulfilled (food is ready → resolve)
Rejected (order failed → reject)


- Using Promises we can handle asynchronous operations in JavaScript like making http requests 
- Promises are objects which will represent wheather completion or failure of an asynchronous operation. 
- When you create a promise, you can pass a callback function that will be executed when the operation is complete. 
The callback function will receive the result of the operation, or an error object if the operation failed.
-Promises provide a cleaner and more readable way to write code

Promise is an object that may produce a single value some time in the future: 
and the value may be either a resolved value, or a reason it’s not resolved 
(e.g., a network error occurred). 

A promise may be in one of 3 possible states: 

- Pending: not yet fulfilled or rejected
- Fulfilled: onFulfilled() will be called (e.g., resolve() was called)
- Rejected: onRejected() will be called (e.g., reject() was called)

A promise goes from pending to fulfilled, 
or from pending to rejected


const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Order completed!");
  }, 2000);
});

myPromise.then(response => {
  console.log(response); // "Order completed!"
}).catch(error => {
  console.log(error);
});


Promise Chaining
======================
in Promise chaining, promises are linked sequentially. 
this way asynchronous tasks will be performed one after another, 
.then() method returns a new promise allowing them to be chained together.

let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});
promise.then(function(result) {
  console.log(result); 
  return result * 2;
})
.then(function(result) {
  console.log(result); 
  return result * 2;
})
.then(function(result) {
  console.log(result); 
  return result * 2;
});

Initial promise resolves to 1 after 1 second. 
Then we chain three .then() methods onto it. Each .then() takes the result of the previous promise, doubles it, and passes it on to the next .then().

Error handling
=========================
.catch() method is used to handle the Promise based errors, catch method is chained at the end of a promise chain and it catches any error that occurs.

Catch block receiveds error object thrown from rejected promise.

new Promise((resolve, reject) => {
  throw new Error('Error!');
}).catch(err => {
  console.error(err.message); // logs 'Error!'
}).finally(() => console.log('Operation completed'));

In this case, ‘Operation completed’ will be logged whether the promise was fulfilled or rejected. The finally block ensures that certain operations are performed irrespective of the promise’s fate, making it ideal for cleanup activities post async operations.

Another way to handle errors is by passing two functions into the then() method: one for success, another for failure. However, this approach might lead to unhandled exceptions if an error occurs in the success handler.

new Promise((resolve, reject) => {
  throw new Error('Error!');
}).then(() => {
  // Success handler
}, err => {
  // Failure handler
  console.error(err.message); // logs 'Error!'
});

Nested promises
======================
Nested promises are useful when dealing with dependent asynchronous operations. For instance, consider a scenario where we need to fetch user data from an API and then use that data to make another request.

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        // Fetch user data...
    });
}
function getAdditionalData(userData) {
    return new Promise((resolve, reject) => {
        // Use userData to fetch additional data...
    });
}
getUserData('123').then(userData => {
    return getAdditionalData(userData).then(additionalData => {
        console.log(additionalData);
    });
}).catch(error => {
    console.error(error);
});

callback function to promise convertion:
==============================================

function callbackFunction(arg1, arg2, callback) {
  // Original function body
}

function promiseFunction(arg1, arg2) {
  return new Promise((resolve, reject) => {
    callbackFunction(arg1, arg2, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

Multiple Promise in Sequence:
==================================
To run multiple promises in sequence, you would use the .then() method. This allows each promise to wait for the previous one to resolve before it starts executing.

let promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'one');
});
let promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'two');
});
promise1.then((result1) => {
  console.log(result1);
  return promise2;
}).then((result2) => {
  console.log(result2);
});

custom Promise
=================
A custom Promise can be created using the Promise constructor, which takes an executor function as its argument. 
This executor function has two parameters: resolve and reject, which are both functions.

Here’s a simple example:

let myPromise = new Promise((resolve, reject) => {
    let condition = true; // this could be any condition
    if(condition) {
        resolve('Promise is resolved');
    } else {
        reject('Promise is rejected');
    }
});
In this code snippet, myPromise is our custom Promise. The executor function checks a condition (which can be anything). If the condition is met, it calls resolve() with a success message. If not, it calls reject() with an error message.

19. What is the significance of the executor function in a Promise?
The executor function in a Promise is significant as it contains the computation or asynchronous operation to be performed. It’s immediately executed by the Promise implementation, providing two functions: resolve and reject. Resolve shifts the Promise from pending to fulfilled state when the operation completes successfully, passing the result as an argument. Reject moves the Promise to rejected state if an error occurs, with the error passed as an argument. This design allows for efficient handling of asynchronous operations within JavaScript, ensuring non-blocking code execution.

20. Can you explain the difference between then-catch and then-second argument practices in Promises?
In JavaScript Promises, both then-catch and then-second argument practices are used for error handling. The key difference lies in their scope of catching errors.

The then-catch practice involves chaining a .catch method after the .then method. This approach catches any exceptions thrown from the preceding promise or its handler functions. It’s more comprehensive as it can catch synchronous and asynchronous errors alike.

On the other hand, the then-second argument practice uses two arguments in the .then method: a success handler and an error handler. The error handler here only catches exceptions that occur in the preceding promise, not those in the success handler itself.

Therefore, while the then-second argument practice might seem simpler, it has limited error-catching capabilities compared to the then-catch practice which provides broader coverage.

21. Can you walk me through the concept of Promise settling?
A Promise in programming is an object representing the eventual completion or failure of an asynchronous operation. It’s a placeholder for a value not necessarily known when the promise is created.

Promise settling refers to the state change from pending to either fulfilled or rejected. Once settled, it remains at that state and can’t be resettled. If it’s fulfilled, it has a resulting value; if rejected, it has a reason for rejection.

Fulfillment happens when the async operation completes successfully, and the promise’s then method is called with the result as its argument. Rejection occurs when the operation fails, and the catch method is invoked with the error as its argument.

Here’s a simple code example:

let p = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if(a == 2){
    resolve('Success!');
  } else {
    reject('Failed!');
  }
});
p.then(message => { console.log(message) }).catch(err => { console.log(err) });
In this case, the promise p settles by being fulfilled because 1+1 equals 2, so ‘Success!’ is logged.

22. What does the term ‘unhandled Promise rejection’ mean?
An ‘unhandled Promise rejection’ refers to a situation where an error is thrown inside a Promise, but there’s no catch block or .catch() method attached to handle it. This can lead to unpredictable application behavior and potential crashes. It’s crucial to always have error handling mechanisms in place when working with Promises to ensure that any errors are properly caught and dealt with.

23. How do you debug Promise-based code in Node.js?
Debugging Promise-based code in Node.js involves several steps. First, use the ‘unhandledRejection’ event to catch unhandled promise rejections globally. This can be done by adding a process.on(‘unhandledRejection’) handler at the start of your script. Second, utilize async/await syntax for cleaner and more readable code. It allows you to write asynchronous code as if it were synchronous, making debugging easier. Third, make use of console.log() statements or a debugger tool like Node Inspector to inspect variables and track execution flow. Fourth, ensure proper error handling is implemented using .catch() blocks after every then(). Lastly, consider using libraries such as Longjohn or Bluebird that provide long stack traces for promises, which can help identify where an error originated from.

24. Can you explain the concept of ‘Promise anti-patterns’?
Promise anti-patterns refer to practices that negate the benefits of Promises in asynchronous programming. One such pattern is ‘nested promises’, where a Promise is created inside another Promise’s then() or catch(). This leads to unnecessary complexity and defeats the purpose of Promises, which is to flatten callback hell.

Another common anti-pattern is not returning results from within a .then() block or a .catch() block. This can lead to unexpected behavior as subsequent .then() blocks may execute before previous ones have completed.

The ‘ignoring catch’ anti-pattern occurs when developers do not handle rejections, leading to unhandled promise rejections. It’s crucial to always handle errors by chaining a .catch() at the end of your Promise chain.

Lastly, the ‘overcomplicating promise resolution’ anti-pattern involves unnecessarily wrapping data or values into a Promise. If a value isn’t promise-like (doesn’t have a .then method), there’s no need to wrap it into a Promise.

25. How would you handle the situation where a Promise is neither fulfilled nor rejected?
In a situation where a Promise is neither fulfilled nor rejected, it’s in a pending state. To handle this, we can use the ‘finally’ method which executes regardless of whether the promise was resolved or rejected. This ensures that certain cleanup operations are always performed.

For instance:

let p = new Promise((resolve, reject) => {
  // some operation
});
p.finally(() => {
  console.log('Promise is settled');
});
However, if you need to set a timeout for a Promise to be either resolved or rejected, you can create a wrapper function around the Promise with ‘setTimeout’. If the Promise doesn’t settle within the specified time, ‘reject’ is called.

Example:

function promiseWithTimeout(ms, promise){
  let timeout = new Promise((_, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject(`Timed out in ${ms} ms.`);
    }, ms)
  })
  return Promise.race([
    promise,
    timeout
  ])
}

*/