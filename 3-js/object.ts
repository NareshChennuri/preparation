/* 
for (const key in obj) { }
Object.keys(obj).forEach();
Object.values(obj).forEach();

Object.seal() // only values, can't change structure
  - can update existing property values but can't add new properties or delete properties

  Object.freeze() // immutable
  - can't change both the properties and their values, effectively making the object immutable.


For...in Loop:
----------------------------------
The for...in loop is the most common way to iterate over the properties of an object.

const obj = { a: 1, b: 2, c: 3 };

for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}
Note the use of hasOwnProperty to ensure that the properties being iterated over are direct properties of the object and not inherited from the prototype chain.


Object.keys() Method:
----------------------------------
The Object.keys() method returns an array of a given object's own enumerable property names.

const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj) // ['a','b','c']

Object.keys(obj).forEach(function(key) {
  console.log(key, obj[key]);
});


Object.values() Method:
----------------------------------
The Object.values() method returns an array of a given object's own enumerable property values.

const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj) // [1,2,3]

Object.values(obj).forEach(function(value) {
  console.log(value);
});


Object.entries() Method:
----------------------------------
The Object.entries() method returns an array of a given object's own enumerable property [key, value] pairs.

const obj = { a: 1, b: 2, c: 3 };

// Object.entries(obj): [['a', 1], ['b', 2], ['c', 3]]

Object.entries(obj).forEach(function([key, value]) {
  console.log(key, value);
});


Object.assign(): (copy or merge one or more obj into a target obj)
---------------------------
we can copy one or more obj into a target object

Copies the values of (all enumerable properties)
from one or more source objects to a target object.

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const merged = Object.assign(target, source);
// target: { a: 1, b: 3, c: 4 }, merged: { a: 1, b: 3, c: 4 }


Object.create():
-----------------------------
Creates a new object with the specified prototype object and properties.

const myObject = Object.create({ prototypeProperty: 'I am a prototype property' });
// myObject has prototypeProperty from the prototype object


Object.hasOwnProperty(): (its own property not inherited one)
-------------------------------
Returns a boolean indicating whether an object has the specified property as its own property (not inherited).

const myObject = { a: 1, b: 2 };
console.log(myObject.hasOwnProperty('a')); // true
console.log(myObject.hasOwnProperty('toString')); // false (inherited from Object prototype)


Object.freeze() and Object.seal():
--------------------------------------------
Object.freeze() makes an object immutable (properties cannot be added, modified, or removed). 
Object.seal() makes an object non-extensible (properties cannot be added or removed, but existing properties can be modified).

const myObject = { a: 1, b: 2 };
Object.freeze(myObject);
// Now, myObject is immutable

const anotherObject = { x: 10, y: 20 };
Object.seal(anotherObject);
// Now, anotherObject is non-extensible


*/