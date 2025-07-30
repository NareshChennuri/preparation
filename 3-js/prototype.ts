/*

In JavaScript, every function automatically has a prototype property.
When we use that function as a constructor to create objects, 
those objects can share methods defined on the prototype.

This helps save memory, because instead of each object having its own copy of a method, 
they all reuse the one from the prototype.


For example, if I have a Person constructor and I define a greet method on Person.prototype,
then every person I create can use that greet method — without duplicating it.

JavaScript also uses something called the prototype chain — if a property or method isn’t 
found on the object itself, JavaScript looks up the chain to the prototype and continues 
searching upward.

So overall, the prototype is how JavaScript handles shared behavior and inheritance, 
and it plays a big role in how objects work behind the scenes.


function Person(name) {
  this.name = name;
}

// Add method to prototype
Person.prototype.greet = function () {
  return `Hello, I'm ${this.name}`;
};

const p1 = new Person("Alice");
const p2 = new Person("Bob");

console.log(p1.greet()); // Hello, I'm Alice
console.log(p2.greet()); // Hello, I'm Bob



*/