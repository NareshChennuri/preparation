/*
Event loop // for asynchronous programming
Microtask: (process.nextTick(), Promise, callback, async functions, queueMicrotask)
Macrotask: (setTimeout(), setInterval(), setImmediate())
----------------

Event loop, Microtasks, and Macrotasks are related to the asynchronous programming in javascript


JavaScript is single-threaded, but it handles asynchronous tasks using the event loop.

The event loop keeps checking: 
  If the call stack is empty.
  If there are microtasks (high priority) or macrotasks(low Piority) to execute.

  Start
  End
  Promise (Microtask) // high priority than macrotasks
  Timeout (Macrotask)


Event Loop:
=============
event loop allows the execution of non-blocking code by continuously checking the message queue for tasks and it executes them in a loop.

so, The event loop enables JavaScript to handle asynchronous operations, like callbacks, promises, and setTimeout, setInterval, I/O operations, without blocking the main thread.

Microtask: (process.nextTick(), Promise, callback, async functions, queueMicrotask)
=============
Microtasks are executed in the microtask queue, which is a part of the event loop.

Microtasks have higher priority than macrotasks and are processed before the next rendering or painting of the browser.

Examples of microtasks include promise callbacks (.then(), .catch(), .finally()), mutation observer callbacks, and process.nextTick() in Node.js.

Macrotask: (setTimeout(), setInterval(), setImmediate())
=============
Macrotasks are tasks that are executed in the macrotask queue, which is also part of the event loop.
Macrotasks include tasks like setTimeout, setInterval, I/O operations, and user interface rendering.
Macrotasks are processed after the microtask queue is emptied.
Here's a simplified flow of how the event loop processes microtasks and macrotasks:

The event loop starts.
It checks the microtask queue and processes all the microtasks in the queue until it is empty.
After processing microtasks, it checks the macrotask queue and executes the first task.
The event loop continues this process, alternating between microtasks and macrotasks.

Example:

console.log('Start');

// Macrotask (setTimeout)
setTimeout(function() {
  console.log('Timeout (Macrotask)');
}, 0);

// Microtask (Promise)
Promise.resolve().then(function() {
  console.log('Promise (Microtask)');
});

console.log('End');
Output:

Start
End
Promise (Microtask)
Timeout (Macrotask)

In this example, the order of execution is Start, End, Promise (Microtask), Timeout (Macrotask). The microtask (Promise) is executed before the macrotask (Timeout), demonstrating the priority of microtasks over macrotasks in the event loop.

*/