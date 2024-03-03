/*

// Polyfill for Array.prototype.forEach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    if (this === null || this === undefined) {
      throw new TypeError('Array.prototype.forEach called on null or undefined');
    }

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const array = Object(this);
    const length = array.length >>> 0; // Convert to unsigned 32-bit integer

    for (let i = 0; i < length; i++) {
      if (i in array) {
        callback.call(thisArg, array[i], i, array);
      }
    }
  };
}

// Example usage:
const numbers = [1, 2, 3, 4];

numbers.forEach(function(item, index, array) {
  console.log(item, index, array);
});

*/