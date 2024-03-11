/*

Proxy (new Proxy(target, handler))
--------------------------------------------
a Proxy is an object that wraps another object (known as the target object) and intercepts operations like property lookup, assignment, invocation, and so on, allowing you to customize or "trap" these operations.

Here's a basic example of how to use a Proxy:

// Creating a Proxy for the target object
let handler = {
  get: function(target, prop) {
    // Intercepting property access
    console.log(`Getting property '${prop}'`);
    return target[prop];
  },
  set: function(target, prop, value) {
    // Intercepting property assignment
    console.log(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
  }
};

// Creating a target object
let target = {
  name: "John",
  age: 30
};

let proxy = new Proxy(target, handler);

// Accessing properties through the proxy
console.log(proxy.name); // Output: Getting property 'name', John
proxy.age = 40; // Output: Setting property 'age' to '40'
console.log(proxy.age); // Output: Getting property 'age', 40

In this example, we create a target object (target) with two properties: name and age. Then, we define a handler object with two traps (get and set) to intercept property access and assignment operations on the target object. Finally, we create a Proxy (proxy) for the target object using the Proxy constructor, passing in the target object and the handler object.

When we access or modify properties through the proxy, the corresponding traps defined in the handler object are invoked, allowing us to customize the behavior of property access and assignment.

Proxies are powerful tools for implementing various patterns such as lazy loading, data validation, logging, and more. They offer a flexible way to intercept and customize object operations in JavaScript.

*/