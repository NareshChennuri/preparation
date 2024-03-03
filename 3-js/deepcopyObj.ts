/*

you can create a deep copy of an object using various methods. Here are a couple of common approaches:

Method 1: Using JSON.parse and JSON.stringify
javascript
Copy code
let originalObject = { key1: 'value1', key2: { nestedKey: 'nestedValue' } };

// Deep copy using JSON.stringify and JSON.parse
let deepCopy = JSON.parse(JSON.stringify(originalObject));

console.log(deepCopy);
This method works well for simple objects without functions or special objects like Date instances. However, it has limitations, and it won't work correctly with objects containing circular references or non-JSON-safe values.

Method 2: Using a Recursive Function

function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCopy);
  }

  // Handle objects
  let copiedObject = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copiedObject[key] = deepCopy(obj[key]);
    }
  }

  return copiedObject;
}

let originalObject = { key1: 'value1', key2: { nestedKey: 'nestedValue' } };

// Deep copy using the recursive function
let deepCopy = deepCopy(originalObject);

console.log(deepCopy);
This method is more flexible and handles a wider range of object types. However, keep in mind that it might still have limitations, especially when dealing with special objects or circular references.

Choose the method that best fits your specific use case. If you are dealing with simple data structures, the first method using JSON.stringify and JSON.parse is usually sufficient. If you have more complex objects, the second method with a recursive function might be a better choice.

*/