/* 

Observables 
    - represent a stream of values over time like on going steam of data. 
    - lazily executed
    - built-in cancellation 
    - better error handling - catch also we can retry()
    - chain and transform data using operators and filters

Promises
    - no ongoing streams of data
    - eagerly executed
    - can be resolved or rejected only once
    - can't cancel
    - allows chaining through .then()
    - more organized


Promises and Observables are both patterns for handling asynchronous operations in JavaScript. 
However, they have different characteristics and offer distinct features. 

#### Promises:

are used for handling asynchronous operations, promises produces a single result.

Promises are eagerly executed. 
As soon as a promise is created, 
asynchronous operation begins, 
once done the promise can be resolved or rejected once.

We can't cancel Promises.

Promises have a simple error-handling mechanism using the .catch() method. 
Errors can be caught at the end of the promise chain.

Promises allow chaining through the .then() method. 
You can attach multiple .then() blocks to a promise to handle resolved or rejected values.

No Ongoing Streams of data. They are suitable for handling one-time asynchronous tasks.

Promises provide a more organized and structured way to handle asynchronous operations, improving readability and reducing callback hell.


#### Observables:

Observables represent a stream of values over time. 
They are used for handling asynchronous operations that produce multiple values over their lifecycle.

Observables are lazily executed. 
The asynchronous operation associated with an observable doesn't start until someone subscribes to it.

Observables have built-in cancellation mechanisms. 
You can unsubscribe from an observable to stop receiving further values and cancel the associated asynchronous tasks.

Observables offer more powerful error-handling capabilities through the .catch() and .retry() operators.

We can chain and transform data using filters, merge operators.

Observables are particularly useful for representing ongoing streams of data, such as events, user inputs, or data thar are fetched over time.

Angular's HttpClient returns Observables for asynchronous HTTP requests, allowing  stream-based nature and comprehensive feature set. 
However, Promises are still widely used and can be a good fit for simpler asynchronous operations that produce a single result.

*/