/*

- Static typing (number, boolean, string, Array, object, Enums, any, unknown, never)

- Tuples (typed arrays ex: [string, boolean, number] ==> ['hello world', true, 3])

- Generics (functions to create custom types with type safety, readability & maintainablity)
    reusable and flexible code by writing functions, classes, and interfaces that can handle different types.
    Generics can be used to achieve type safety and improve the readability and maintainability of code.

    disadvantages: complexity, learning curve and reduced performance.

        function identity<T>(arg: T): T {
            return arg;
        }

        const result = identity<string>('Hello');
        console.log(result); // Hello


    =======================================================
    // Define a generic type for a Student
    interface Student<T> {
        name: string;
        age: number;
        id: T; // Generic identifier type
    }

    // Example usage of the Student type with a number identifier
    const student1: Student<number> = {
        name: 'Alice',
        age: 20,
        id: 12345
    };

    // Example usage of the Student type with a string identifier
    const student2: Student<string> = {
        name: 'Bob',
        age: 22,
        id: 'STU678'
    };
    ==========================================================

Record - an object type with specific key value type
----------------------
const nameAgeMap: Record<string, number> = {
    'Alice': 21,
    'Bob': 25
};

- Interfaces
    interface Rectangle {
        height: number,
        width: number
    }

    const rectangle: Rectangle = {
        height: 20,
        width: 10
    };

- Classes and inheritance
        class Person {
            constructor(public name: string) {};
            greet() {
                console.log(`Hello, my name is ${this.name}`);
            }
        }

        - Modules (import export)

- Namespaces

- Decorators ( are a way to add metadata and behavior to classes, methods, properties, or parameters)

- Async/await

- Union Types (used when a value can be more than a single type)
        function printStatusCode(code: string | number) {
            console.log(`my status code : ${code}`);
        }
        printStatusCode(404);
        printStatusCode('404');

- type annotations (explicitly specify the type of var ex:- a: number, b: string)

- Utility types 
======================
    - Partials (changes all the properties of object to be optional)
    ----------------
        interface Point {
            x: number;
            y: number;
        }

        let pointPart: Partial<Point> = {}; // `Partial` allows x and y to be optional
        pointPart.x = 10;

    - Required
    -----------------
        interface Car {
            make: string;
            model: string;
            mileage?: number;
        }

        let myCar: Required<Car> = {
            make: 'Ford',
            model: 'Focus',
            mileage: 12000 // `Required` forces mileage to be defined
        };    

    - 

- keyof (is a keyword used to extract the key type from an object type.)
--------------------

    interface Person {
        name: string;
        age: number;
    }
    // `keyof Person` here creates a union type of "name" and "age", other strings will not be allowed
    function printPersonProperty(person: Person, property: keyof Person) {
        console.log(`Printing person property ${property}: "${person[property]}"`);
    }
    let person = {
        name: "Max",
        age: 27
    };
    printPersonProperty(person, "name");


Typescirpt parsing
===================
Typescript code needs to be compiled into regular javascript code in order to run in web browser

Compilation process involves
- Parsing
- Type checking and error handling
- Emitting javscript code
- generate one or more js files into specified folder

Typescript configuration
==========================
tsconfig.json
- compiler options (target javascript type, output directory, module system type etc.,)
- include (.ts files)
- exclude (node_modules)


*/