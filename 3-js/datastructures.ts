/*


Singleton Pattern:

Use Case: Database Connection Pooling
In a web application, you might want to ensure that there is a single pool of database connections to avoid resource wastage. The Singleton pattern can be used to manage and provide access to this connection pool.

To coordinate access to a centralized configuration file.
To provide a single point of access to a shared resource, such as a cache or a logger.
To implement a logging mechanism that ensures that all log messages are written to the same file.
To create a global event dispatcher that can be used to notify all interested objects of events that occur in the system.


Factory Pattern:

Use Case: UI Component Creation
When building a user interface, you may have various UI components that need to be created dynamically based on user interactions. A UI component factory can be employed to create and manage the instantiation of these components.

Observer Pattern:

Use Case: Event Handling in GUIs
In a graphical user interface, components (observers) such as buttons or checkboxes may need to react to changes in other components. The Observer pattern can be used to establish a relationship between these components, allowing them to react to events.
Module Pattern:

Use Case: JavaScript Modules
When developing a JavaScript application, you might use the Module pattern to encapsulate related functionality. Each module can have private and public members, providing a clean and organized structure.

Prototype Pattern:

Use Case: Object Cloning
In scenarios where you need to create multiple instances of an object with similar properties, the Prototype pattern can be applied for object cloning. This is particularly useful in scenarios where creating new objects is resource-intensive.



=================


Singleton Pattern:
=========================================
Ensures that a class has only one instance and provides a global point of access to it.

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true

Factory Pattern:
=========================================
Defines an interface for creating an object but lets subclasses alter the type of objects that will be created.

class Product {
  constructor(name) {
    this.name = name;
  }
}

class ProductFactory {
  createProduct(name) {
    return new Product(name);
  }
}

const factory = new ProductFactory();
const product = factory.createProduct('Example Product');

Observer Pattern:
=========================================
Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.update());
  }
}

class Observer {
  update() {
    console.log('State updated!');
  }
}

const subject = new Subject();
const observer = new Observer();

subject.addObserver(observer);
subject.notifyObservers();

Module Pattern:
=========================================
Encapsulates private and public members using closures, revealing only necessary functionalities.

const module = (function() {
  let privateVar = 'I am private';

  return {
    publicVar: 'I am public',
    getPrivateVar: function() {
      return privateVar;
    }
  };
})();

console.log(module.publicVar); // I am public
console.log(module.privateVar); // undefined

Prototype Pattern:
=========================================
Creates new objects by copying an existing object, known as the prototype.

const prototypeObject = {
  greet: function() {
    console.log('Hello!');
  }
};

const newObj1 = Object.create(prototypeObject);
const newObj2 = Object.create(prototypeObject);

newObj1.greet(); // Hello!
newObj2.greet(); // Hello!
These design patterns help improve code organization, maintainability, and scalability by providing proven solutions to common development challenges.

*/
