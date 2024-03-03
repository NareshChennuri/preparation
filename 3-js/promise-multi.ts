/*

- Using Promises we can handle asynchronous operations in JavaScript like making http requests 
- Promises are objects which will represent wheather completion or failure of an asynchronous operation. 
- When you create a promise, you can pass a callback function that will be executed when the operation is complete. 
The callback function will receive the result of the operation, or an error object if the operation failed.
-Promises provide a cleaner and more readable way to write code

==============


Promises can be chained together, which allows you to handle multiple asynchronous operations in a single sequence. 

For example, you could use a promise to make an HTTP request, and then chain another promise to handle the response. 
This allows you to write code that is more readable and easier to maintain.

Promises are also useful for handling errors. When a promise fails, it will reject with an error object. 
You can use the catch() method to handle errors and take appropriate action.

Promise object provides several methods for handling multiple promises. 

- Promise.race (first settled promise resolved or rejected)
- Promise.any (first settled promise resolved - ignores rejections)
- Promise.all (all should resolved otherwise gives the rejection error)
- Promise.allSettled:(all settled promise resolved and rejected)

Promise.race(iterable): (first settled promise resolved or rejected)
=================================
const promise1 = new Promise((resolve) => setTimeout(() => resolve('Promise 1'), 1000));
const promise2 = new Promise((resolve, reject) => setTimeout(() => reject('Promise 2'), 500));

Promise.race([promise1, promise2])
  .then(result => console.log('Resolved:', result))
  .catch(error => console.log('Rejected:', error));

o/p: Rejected: Promise 2

Promise.any(iterable): (first settled promise resolved - ignores rejections)
=================================

const promise1 = new Promise((resolve) => setTimeout(() => resolve('Promise 1'), 1000));
const promise2 = new Promise((resolve, reject) => setTimeout(() => reject('Promise 2'), 500));

Promise.any([promise1, promise2])
  .then(result => console.log('Resolved:', result))
  .catch(errors => console.log('All promises were rejected:', errors));
  
o/p: Resolved: Promise 1

Promise.all(iterable): (all should resolved otherwise gives the rejection error)
=================================
const promise1 = Promise.resolve('Promise 1');
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => setTimeout(() => reject('Promise 3'), 500));

Promise.all([promise1, promise2, promise3])
  .then(results => console.log('All resolved:', results))
  .catch(error => console.log('At least one promise was rejected:', error));

o/p: At least one promise was rejected: Promise 3

Promise.allSettled(iterable): (all settled promise resolved and rejected)
=================================
const promise1 = Promise.resolve('Promise 1');
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => setTimeout(() => reject('Promise 3'), 500));

Promise.allSettled([promise1, promise2, promise3])
  .then(results => console.log('All settled:', results))
  .catch(error => console.log('Error:', error)); // This catch is for unexpected errors, not for handling rejections in promises.

o/p: All settled: (3) [{…}, {…}, {…}]  
      [0] : {status: 'fulfilled', value: 'Promise 1'}
      [1] : {status: 'fulfilled', value: 42}
      [2] : {status: 'rejected', reason: 'Promise 3'}


*/