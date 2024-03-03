/*

Functional programming (FP) and object-oriented programming (OOP) are two different programming paradigms 
with distinct approaches to writing and organizing code. 

Functional Programming (FP):
- treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. 

    - First-Class Functions: Functions are treated as first-class citizens, meaning they can be assigned to variables, passed as arguments to other functions, and returned as values from other functions.

    - Pure Functions: are functions that return the same output for the same input and have no side effects. 
    They don't modify external state or data.

    - Immutability: Data is immutable, meaning once created, it cannot be changed. 
    Instead of modifying existing data, FP encourages creating new data structures.

    - Higher-Order Functions: Functions can take other functions as arguments or return functions as results. This enables the composition of functions to create more complex behavior.

    - Recursion: is commonly used instead of iterative loops for iteration and repetition.


Object-Oriented Programming (OOP):
Object-oriented programming is a programming paradigm based on the concept of "objects," which can contain data, in the form of fields (often known as attributes or properties), and code, in the form of procedures (often known as methods). Key characteristics include:

Classes and Objects:
Objects are instances of classes, which act as blueprints for creating objects. Classes define the structure and behavior of objects.

Encapsulation:
Encapsulation refers to the bundling of data (attributes) and methods (functions) that operate on the data into a single unit (object). This hides the internal state of objects and restricts access to it.

Inheritance:
Inheritance allows classes to inherit attributes and methods from other classes. It facilitates code reuse and the creation of hierarchies of classes.

Polymorphism:
Polymorphism allows objects of different classes to be treated as objects of a common superclass. It enables methods to be defined in multiple classes and be invoked based on the runtime type of the object.

Modularity:
OOP promotes modularity by organizing code into small, self-contained objects that interact with each other.

Key Differences:
State Handling:
    FP emphasizes immutable data and pure functions, while OOP encapsulates state within objects and provides methods to manipulate that state.
Control Flow:
    FP relies heavily on higher-order functions and recursion for control flow, while OOP uses methods and message passing between objects.
Data Transformation:
    FP focuses on transforming data using pure functions and function composition, while OOP focuses on encapsulating data and behavior within objects.
Error Handling:
    FP tends to favor handling errors using techniques like monads or algebraic data types, while OOP typically uses exception handling mechanisms.


*/