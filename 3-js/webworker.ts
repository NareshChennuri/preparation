/*

- A Web Worker is a JavaScript code that runs in the background independently from the main UI thread.
    - 1) Instantiate a new Worker object, passing the URL of the worker script as an argument.
    - The worker script is a separate JavaScript file.

- Web Workers communicate with the main thread using event listeners.
    - They send messages to the main thread using postMessage() method and 
    - receive messages using onmessage event handler.
    
- Web Workers can be terminated by calling the terminate() method on the worker object from the main thread.
- Web Workers have limitations such as they cannot directly manipulate the DOM or access the window object.
- Web Workers are suitable for tasks like heavy computations, data processing, and background tasks such as fetching data from APIs.

// Create a new web worker
const worker = new Worker('worker.js');

// Send a message to the web worker
worker.postMessage({ message: 'Hello from the main thread!' });

// Listen for messages from the web worker
worker.addEventListener('message', (event) => {
  console.log(`Message received from the web worker: ${event.data}`);
});



> worker.js
---------------
// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  console.log(`Message received from the main thread: ${event.data.message}`);

  // Send a message back to the main thread
  self.postMessage({ message: 'Hello from the web worker!' });
});




*/