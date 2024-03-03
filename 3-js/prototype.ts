/*

In JavaScript, you can achieve inheritance through prototype chaining. Here's an example to illustrate how you can create a simple inheritance structure:

// Parent class
function Animal(name) {
  this.name = name;
}

// Adding a method to the prototype of the parent class
Animal.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

// Child class inheriting from the parent class
function Dog(name, breed) {
  // Call the parent class constructor
  Animal.call(this, name);
  
  // Additional property for the child class
  this.breed = breed;
}

// Set up the prototype chain: Make Dog prototype inherit from Animal prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Reset the constructor property

// Adding a method to the prototype of the child class
Dog.prototype.bark = function() {
  console.log("Woof! Woof!");
};

// Creating instances of the classes
const genericAnimal = new Animal("Generic Animal");
const myDog = new Dog("Buddy", "Labrador");

// Using inherited methods
genericAnimal.sayHello(); // Outputs: Hello, I'm Generic Animal
myDog.sayHello();        // Outputs: Hello, I'm Buddy

// Using methods specific to the child class
myDog.bark();             // Outputs: Woof! Woof!
In this example:

Animal is the parent class, and Dog is the child class.
The Animal constructor initializes the name property, and the sayHello method is added to its prototype.

The Dog constructor calls the Animal constructor using Animal.call(this, name) to set up the name property. It also introduces an additional property, breed.

Object.create(Animal.prototype) is used to set up the prototype chain, making Dog inherit from Animal. This allows instances of Dog to access the methods defined in the Animal prototype, including sayHello.

The Dog prototype is further extended with the bark method.

This is a basic example of prototype-based inheritance in JavaScript. Keep in mind that with ECMAScript 6 (ES6) and later, you have the class syntax that provides a more concise and familiar way to define classes and handle inheritance.

*/