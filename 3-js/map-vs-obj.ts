/*

both maps and objects used to store key-value pairs. 
but there are few differences, and based on the use case we need to use maps or objects.

Key Type Flexibility:
------------------------
Maps can have any data type as a key, it can have objects and primitive values as well. 

Objects can Only have strings and symbols as keys. 
If you need to use other data types as keys, you have to convert them to strings.

Order of Insertion:
------------------------
Maps: Preserve the order of key-value pairs based on the order of insertion. Iterating over a map will follow the order in which elements were added.
Objects: Do not guarantee a specific order for key-value pairs. Iterating over an object may not reflect the order of insertion.

Size and Performance:
------------------------
Maps: Provide a size property to easily get the number of key-value pairs. They also have dedicated methods for operations like size retrieval, iteration, and deletion.
Objects: Don't have a built-in method to get the number of properties. To get the size of an object, you need to manually iterate through the properties, which can be less efficient for large datasets.

Iterating Over Keys:
------------------------
Maps: Have built-in methods like forEach, keys, and values for easy iteration over keys and values.
Objects: Iterating over object keys requires more manual handling using methods like Object.keys(), Object.values(), or for...in loops.

Garbage Collection:
------------------------
Maps: Are more memory-efficient in scenarios where objects are used as keys. When an object is used as a key in a map, it won't prevent the object from being garbage-collected.
Objects: Can lead to memory leaks if objects are used as keys, as they will be held in memory as long as the object itself is reachable.

Equality Comparison:
------------------------
Maps: Use the SameValueZero algorithm for key equality. This means that two objects with the same structure and values are considered distinct keys.
Objects: Use string coercion for keys, which may lead to unexpected behavior when using objects as keys.



new Map()	Creates a new Map object
set()	Sets the value for a key in a Map
get()	Gets the value for a key in a Map
clear()	Removes all the elements from a Map
delete()	Removes a Map element specified by a key
has()	Returns true if a key exists in a Map
forEach()	Invokes a callback for each key/value pair in a Map
entries()	Returns an iterator object with the [key, value] pairs in a Map
keys()	Returns an iterator object with the keys in a Map
values()	Returns an iterator object of the values in a Map

size	Returns the number of Map elements

const fruits = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200]
]);

or

const fruits = new Map();

// Set Map Values
fruits.set("apples", 500);
fruits.set("bananas", 300);
fruits.set("oranges", 200);

fruits.get("apples");    // Returns 500

fruits.size;




*/