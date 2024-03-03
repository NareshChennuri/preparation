/*
Primitive Data Types:
================================
String: let text = "Hello, World!";
Number: let integerNumber = 42;
        let floatingPointNumber = 3.14;
Boolean: let isTrue = true;
         let isFalse = false;
Undefined: Represents a variable that has been declared but has not been assigned a value.
Null: Represents the intentional absence of any object value.
      let nullValue = null;
Symbol: Introduced in ECMAScript 6, symbols are unique and immutable data types often used as identifiers for object properties.
let symbolKey = Symbol("uniqueKey");

Object Data Types:
======================
Object: Represents a collection of key-value pairs, where keys are strings or symbols, and values can be of any data type.
let person = {
  name: "John",
  age: 30,
  isStudent: false,
};
Array: Represents an ordered list of values.
let fruits = ["apple", "banana", "orange"];
Special Object Data Types:
=============================
Function: A subtype of object, functions are executable objects that can be invoked.
function greet(name) {
  console.log("Hello, " + name + "!");
}
Date: Represents a specific point in time.
    let currentDate = new Date();
RegExp: Represents regular expressions, used for pattern matching.
    let pattern = /[0-9]+/;


##hoisting##
------------------
Hoisting is a process of moving the variable & Function declarations to the top of the file where they are declared, this is done automatically by the javascript engine that is executing the code, this is the reason we can call the functions that are defined using the function declaration syntax before the defination.
The JavaScript interpreter looks ahead to find all the variable/function declarations and then hoists them to the top of its current scope where they're declared, this is called hoisting.

var, let, const
------------------

var is function-scoped, val allows re-declaration and updating it's value.

let is block-scoped, let allows updating it's value, but not re-declaration.

const is also block-scoped, but once assigned, we cannot change its value nor re-declare it.


Example:

var x = 1;
let y = 2;
const z = 3;

// var can be re-declared and updated
var x = 4; 
x = 5; 

// let can be updated but not re-declared
y = 6; 

// const cannot be updated or re-declared
// z = 7;  // Error
// const z = 8;  // Error


##Let##
Javascript doesn't have block scoping, for example a variable defined between curly braces like in an if statement can be accessed outside of the if statement.
So to make use of block scoping in Javascript we can use Let keyword, so the variables you use inside a block stays inside of that block and it is not accessible from outside.
Let behaves similar to the Var but the important difference is the block scoping.

##const##
const used to create a constant variables that means the value is not going to change and if we ever try to change it we will get an error because that is not possible. A constant defined once and it should keep its value.

1: var and let can change their value and const cannot change its value
2: var can be accessible anywhere in function but let and const can only be accessible inside the block where they are declared.
3: const cannot be declared only, you need to initialize it with declaration
4: let and const hoist but you cannot access them before the actual declaration is evaluated at runtime. So in case of let and const you cannot access them before declaration.

##Arrow Functions##
--------------------------

   Arrow functions allows you to write functions in a more concise and shorter way.
   We can use arrow functions wherever we are using the normal functions, like in the call back functions, only with a differnet syntax,
   
   But there is one big difference from normal functions to array functions is that the 'this' keyword treated and handled differently.
   Arrow functions just keep the context in which the function is defined.

   with Arrow Functions you won't need bind or apply or call all those workarounds you used with es5 to get this to the right context but it will just keep the context in which the function is defined.

   Note: in Arrow functions arguments doesn't bind, i.e why don't use arguments inside an arrow function.
   var fn = () => console.log(this); // this will give you the window object
   function fn2() {
    console.log(this); // this will also give you window object
   }
   
   **BUT
   
   var button = document.querySelector('button');
   var fn = () => console.log(this);
   function fn2() {
    console.log(this);
   }
   
   button.addEventListener('click', fn2); // here fn2 will give the button object not the window object
   button.addEventListener('click', fn); // here fn will keep the context where it is defined and give you the window object.
   
//***** Explain the closure
------------------------------

A closure is a function defined inside another function and it can access the variables that are defined in the outer function scope.

The closure has access to variables in three scopes; 
(1) variable in its own scope, 
(2) variables in the enclosing function’s scope, and 
(3) global variables.

- Closures are commonly used to give objects data privacy. When you use closures for data privacy, 
the enclosed variables are only in scope within the containing (outer) function.

const manageBankAccount = function(initialBalance) {
    let accountBalance = initialBalance;
    
    return {
        getBalance: function() { return accountBalance; },
        deposit: function(amount) { accountBalance += amount; },
        withdraw: function(amount) {
            if (amount > accountBalance) {
                return 'You cannot draw that much!';
            }

            accountBalance -= amount;
        }
    };
}

const accountManager = manageBankAccount(0);

accountManager.deposit(1000);
accountManager.withdraw(500);
accountManager.getBalance(); // 500

--------------------------------------------------

you can also use forEach on Arrays

const numbers = [1,2,3,4,5];
numbers.forEach((number, index) => console.log(index, number)); // here we can also access the index

//** ways to clone an object
1) loop through the keys

const another = {};
for (const key in person){
    another[key] = person[key];
}
   
2) using Object.assign method

const another = Object.assign({}, person); // using this approach we can clone mutiple objects and combine into single object.
   
3) using the spread operator
const another = { ...person }; // spread the object properties and methods and create a new object from it.
   
//*** copy an array 
let a = [1,2,3,4];

// by using Object assign function
let b = Object.assign([],a);

// by using spread operator (shallow copying)
let b = [...a];

// by using array slice passing 0
let b = a.slice(0);
console.log(b);
   
//** how to check whether it is an array or object or null
#by using toString function of prototype
Object.prototype.toString.call( {} ); // "[object Object]"
Object.prototype.toString.call( [] ); // "[object Array]"
Object.prototype.toString.call( null ); // "[object Null]"
Object.prototype.toString.call( undefined ); // "[object Undefined]"
#using jquery
if($.isArray(arrayList))
if($.isObject({}))
   
https://www.toptal.com/javascript/interview-questions
   
//***** removing duplicate values in an array *****
   
let dups = [1, 1.5, 2.6, 10, 8, 1.5, 3.5, 5, 8, 1.5, 2.6];

let noDups = [];
//using for or loop
for(let i of dups){
    if(noDups.indexOf(i) === -1) {
      noDups.push(i);
     }
}

//by sorting logic
   dups.sort();
   let noDups = [];
   let temp;
   dups.forEach((val) => if (noDups[val] !== temp) { noDups.push(val); temp = val});

   //by creating an object
   let obj = {};
   for(let i of dups){
    obj[i] = true;
   }
   console.log(Object.keys(obj));

   //by Set() constuctor
   let noDups = new Set(dups);
   console.log([...new Set(dups)]); //  [1, 1.5, 2.6, 10, 8, 3.5, 5]
   
   
   //***** copy an array *****
   
   let a = [1,2,3,4];
   let b = Object.assign([],a); //here cloning the array
   let b = [...a];
   let b = a.slice(0);
   
   ##Deep copying##
   let deepArr = JSON.parse(JSON.stringify(arr));
   
   //***** use strict *****
   use strict is a way to voluntarily enforce stricter parsing and error handling on your JavaScript code at runtime.
   -Makes debugging easier
   -Prevents accidental globals
   -Eliminates this coercion
   -disallows duplicate parameter values
   
   //***** string is polindrome?
   return (str == str.split('').reverse().join(''));
   

   
   //**** tell me the output
   console.log(1 +  "2" + "2"); //122
   console.log(1 +  +"2" + "2"); //32
   console.log(1 +  -"1" + "2"); //02
   console.log(+"1" +  "1" + "2"); //112
   console.log( "A" - "B" + "2"); //NaN2
   console.log( "A" - "B" + 2); //NaN
   
   
   //** remember this about logical operators
   
   0 || 9 = 9 // false or true is true so it returns the evaluated true value i.e 9
   8 || 6 = 8 // true or true returns first true value i.e 8
   0 && 1 = 0 // false and true returns false as boolean 0
   false && 9 = false
   1 && 2 = 2 // true and true returns the last evaluated true value i.e 2
   
   
   /**** ARRAYS 
-------------------------------------
   //*** common array functions
   array.push(5)//adds element at the end of the array # modifies
   array.unshift(1) // adds element at the start of the array # modifies

   array.pop()//removes the last element # modifies
   array.shift()//removes the first element #modifies

   array.slice(2,2)//gives the second element, #doesn’t modify
   array.splice(2,2,'php')//removes the second element and adds given element #modifies
   
   array.reverse()//arrange the elements in reverse order #modifies
   
   array.concat(arr2)//adds the arr2 elements to the end of array elements, #modifies array, #doesn’t modify arr2
   array.join(!);//[a,b,c] to a!b!c #doesn’t modify
   
   array.every((val) => val >= 0) // check all the elements are positive numbers in array
   array.some((val) => val >= 0) // check if there is any positive number in array
   
   array.sort() // for sorting
   array.find() // to find the element
   array.filter() // filter out nonrequired elements
   array.map() // to map every element in the array with the modified value
   
   array.reduce() // it will reduce all the array element values into a single value

   // getting total sum of array values using reducer method
   let numbers = [1,-1,2,3,4];
   const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
   }, 0); // sum will be 5
   
   ** if you dont' set the initial value occumulator will point to the first element by default.
   
   //shroter way
   const sum = numbers.reduce((acc, val) => acc + val);
   
   //filter out negative numbers
   const positiveNumbers = numbers.filter(n => n >= 0); // [1,2,3,4]
   
   
   //*** find object by id in Array Object list
   const personList = [{id: 221, name: 'naresh'}, {id: 532, name: 'rakesh'}];
   const person = personList.find(person => person.id === 532);
   
   //** empty an array
   
   let numbers = [1,2,3,4];
   let another = numbers;
   //sol1:  will empty the array but the other references will hold the array data, that are already assigned
   numbers = []
   //sol2: it is recommended as it will update the references data also
   numbers.length = 0;
   //sol3 not so clean
   numbers.splice(0, numbers.length); // remove from the index 0 to the length of the array
   
   es5 is the currently running in the browser and es6 is the next-gen version.
   to support es6 you need some kind of compiler which basically takes your es6 code and rewrites into es5 styled way.
      
   ## we can give default values to arguments ##
   function isEqualTo(number, compare = 10) {
    return number === compare;
   }
   console.log(isEqualTo(10)); // true
   
   
   ##Object literals##
   Shortcut to initialize fields ot to setup functions
   
   let name = "Anna";
   let age = 25;
   
   let ageField = "age";
   
   let obj = {
    name, // will search for near by fields and assign it automatically
    [ageField]: 28, // here ageField will be replaced with age
    "greet me"() { // you can use literals like obj[ageField] // 28
     console.log(this.name + ' ' + this.age);
    }
   };
   
   console.log(obj[ageField]); // 28
   
   
   ##rest parameters##
   When you never know about how many parameters that your function is going to receive, then the rest parameter lets you to assign the n number of parameters.
   
   function sumUp(...list) { // three dots here are the rest parameters, which takes a number of arguments not only numbers, strings are mixed arguments and just packs them together in an array
    console.log(list); // [10,15,20]
    //...
   }
   console.log(sumUp(10,15,20));
   
   the three dots will actually convert this list of numbers into an array of numbers
   
   ##rest operator##
   When you use the three dots in the function declaration to hold the parameters it is a rest parameters.
   It takes list of values passed as parameters and creates an array of it
   
   ex:
   function sum(...args){
    let total = 0;
    for (const val of args){
     total += val;
    }
    return total;
   }
   
   sum(5,7,55,48,9,32);
   
   ##spread operator##
   it is kind of opposite to the rest operator
   Takes an array and splits it.
   
   rest & spread looks like same but they differ by the place where you use them.
   
   When you use the three dots in the function declaration to hold the parameters it is a rest parameters.
   If you use the three dots in the function call as an argument it is called as spread operator, which basically splits the array.
   
   let numbers = [1,2,3,4,5];
   console.log(Math.max(numbers)); // will give you error because max function takes list of arguments separated by commas
   console.log(Math.max(...numbers)); // using spread operator, o/p 5
   
   ##Template literals##
   ``
   you can write multiline strings, we can use variables inside of our template literals without having concatination operators
   
   template literals allows you quickly write more complex texts and store them in variables as well as access different variables surrounding those with curly braces.
   
   let name = 'Max';
   
   let description  = `
    Hello, I'm ${name}
   `;
   
   console.log(description);
   
   ##The For-of-Loop##
   
   let testResulsts = [1, 1.5, 2.6];
   
   for(let result of testResulsts) {
    console.log(result); // 1  1.5  2.6
   }
   
   This can be achieved with a for loop but this is a shorter syntax and it's perfect for looping through arrays.
   
   
   ##forEach##
   testResulsts.forEach((result) => console.log(result)); // 1 1.5 2.6
   
   //*****removing duplicate values in an array******
   let dups = [1, 1.5, 2.6, 10, 8, 1.5, 3.5, 5, 8, 1.5, 2.6];
   let noDups = [];
   //using for or loop
   for(let i of dups){
    if(noDups.indexOf(i) === -1) {
      noDups.push(i);
     }
   }
   //using forEach
   dups.forEach((val) => noDups.indexOf(val) === -1 ? noDups.push(val) : null);
   //using Maps
   dups.map(val => noDups.indexOf(val) === -1 ? noDups.push(val) : null);
   removing duplicates in array by sorting
   //by sorting logic
   dups.sort();
   let noDups = [];
   let temp;
   dups.forEach((val) => if (noDups[val] !== temp) { noDups.push(val); temp = val});
   //by creating an object
   let obj = {};
   for(let i of dups){
    obj[i] = true;
   }
   console.log(Object.keys(obj));
   //by Set() constuctor
   let noDups = new Set(dups);
   console.log(noDups); // it will give as a set not as an array to fix this
   console.log([...noDups]); // using spread operator we can get an array
   //simply
   console.log([...new Set(dups)]); //  [1, 1.5, 2.6, 10, 8, 3.5, 5]
   
   //*** copy an array ***
   let a = [1,2,3,4];
   // by using Object assign function
   let b = Object.assign([],a);
   // by using spread operator (shallow copying)
   let b = [...a];
   // by using array slice passing 0
   let b = a.slice(0);
   console.log(b);
   
   //** sorting objects in array
   
   const courses = [
   {id: 1, name: 'Node.js'},
   {id: 2, name: 'javascript.js'}
   ];
   /* logic of sort 
   //a < b ==> -1
   //a > b ==> 1
   //a === b ==> 0
   courses.sort((a, b) => {
   //first make the string to lowercase to sort properly
   if(a.toLowercase() < b.toLowercase){
    return -1;
   }
   if(a.toLowercase() > b.toLowercase){
    return 1;
   }
   return 0;
   });
   
   
   //** inheritance with prototype
   Circle.prototype = Object.create(Shape.prototype); //circle extending from shape object
   Cicle.prototype.constructor = Circle; // we need to point the constructor back to its own (these 2 lines are required for inheritance)
   
   ** or we can write a "Intermediate function Inheritance" - a function for extending the parent object
   function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
   }
   
   Note that this kind of prototype inheritance only extends the properties/methods that are present in prototype, but not the Object methods, to fix this we should create an object and assign it to the prototype as below;
   //instead of - Circle.prototype = Object.create(Shape.prototype);
   Circle.prototype = new Shape(); // now the methods that are in prototype as well as the methods that are in Shape object will be inherited.
   
   // inherit circle object from shape object
   function Shape(){
   }
   Shape.prototype.duplicate = function(){
   }
   function Circle(radius){
    this.radius = radius;
   }
   Circle.prototype.draw = function() {
   }
   Circle.prototype = Object.create(Shape.prototype); // now Circle will be inherited from Shape, before this it was inherited from Object
   /* Always reset the constructor to point its own constructor, so that, when we cteate objects of circle programatically  it will create as a Circle object
   not as a Shape object 
   Cicle.prototype.constructor = Circle;
   const s = new Shape();
   const c = new Circle(1);
   //CHECK the console for both s & c objects to find out the prototypical inheritance.
   
   /** how to call the parent constructor for setting the property
   function Circle(radius, color){
    Shape.call(this, color); // calling the parent constructor and setting the color property
    this.radius = radius;
   }
   
   
   /*** Compositions with Mixins **
   There is a problem with Inheritance, we should't create multilevel of inheritance which will create problems and it is not easy to maintain
   
   Animal - canEat(), canWalk()
   Cat->Animal
   Dog->Animal
   
   GoldFish->Animal (here fish can't walk, so it will fail)
   
   again we need to create multilevel inheritance
   
   Animal - canEat()
     |-> Mammal -> canWalk()
     |-> NonMammal -> canSwim()
   
   Cat->Mammal->Animal
   Dog->Mammal->Animal
   GoldFish->NonMammal->Animal
   
   so it is complex to maintain a multilevel inheritance, instead of this we can use "Compositions"
   
   const canEat = {
    eat: function() {
    }
   }
   
   const canWalk = {
    walk: function() {
    }
   }
   
   const canSwim = {
    swim: function() {
    }
   }
   //Object.assing() with this we can copy the properties and methods from one object to another
   function Dog() { // dog constructor
   }
   Object.assign(Dog.prototype, canEat, canWalk); // creating a new object with two compositions.
   
   const Rexx = new Dog(); // now Rexx object will have canEat, canWalk methods
   
   function Fish(){
   }
   Object.assign(Fish.prototype, canEat, canSwim);
   
   const GoldFish = new Fish();  // now GoldFish object will have canEat, canSwim methods
   
   *** we can create mixin function like below
   
   function mixin(target, ...sources){
    Object.assign(target, ...sources);
   }
   
   //now instead of Object.assign(Dog.prototype, canEat, canWalk) we can call the mixin
   mixin(Dog.prototype, canEat, canWalk);
   
   //**** ES6 classes ****
   classes provide a cleaner syntax to implement inheritance than prototypical inheritance.
   
   class Circle {
    constructor(radious){
     this.radious = radious;
    }
    draw(){ // here draw method will be present in the __proto__, not in the object itself
     console.log('draw');
    }
   }
   
   const c1 = new Circle(1);
   c1.draw();
   
   /** ES6 Symbol() *
   Symbol() is used to implement private property and methods.
   
   const _radius = Symbol();
   const _draw = Symbol();
   
   class Circle {
    constructor(radius){
     this[_radius] = radius; // this will be a private property, you can't access it directly
    }
    
    [_draw](){ // private method
     console.log('draw something');
    }
   }
   
   const c = new Circle(1);
   const key = Object.getOwnPropertySymbol(c)[0];
   console.log(c[key]); // 1
   
   // WeekMap() for creating private properties/methods
   
   const _radius = new WeekMap();
   const _move = new WeekMap();
   
   class Circle{
    constructor (radius){
     _radius.set(this, radius);
     _move.set(this, ()=>{ // here if you use function() instead of ()=>, you will not get the this context.
      console.log('move it');
     });
    }
    
    draw(){
     console.log(_radius.get(this)); // will give you radius private property value
     _move.get(this)(); // here we are calling the private method.  
    }
   }
   
   
   OOProgramming
   
   Encapsulation: we group related variable and functions together adn this way we can reduce the complexity, now we can reuse these objects in different parts of a program or in different programs.
   
   Abstraction: We hide the details and show only the essentials that required this techinque reduces complexity and also isolates the impact of changes in the code.
   
   Inheritance: We can eliminate redundant code
   
   Polymorphism: We can make each object method work differently
   
   
   ##Factory Function##
   Factory Function is a function which returns an object
   function createCircle(radius) {
    return {
     radius,
     draw: function() {
      console.log('draw');
     }
    };
   }
   
   const circle = createCircle(1); // here the Factory function returns a new object
   circle.draw(); // draw 
   
   ##Constructor Function##
   function Circle(radius){
    this.radius = radius;
    this.draw = function (){
     console.log('draw');
    }
   }
   const circle2 = new Circle(1); // the new keyword will create an empty object and then Circle function will be called and using this it will create properties to that object. if you don't use the new keyword and just call the function, then it will create the properties on the global object called window.
   
   ##Primitives##
   Numbers, String, Boolean, Symbol, undefined, null
   ##Objects##
   Objects, Arrays, Functions
   
   Primitives are copied by their value
   Objects are copied by their reference
   
   ##private properties and private methods##
   function Circle(radius){
    this.radius = radius;
    let defaultLocation = {x:0, y:0}; //making this a private prop with let keyword
    let computeOptimumLocation = function(factor) { // private method
     //...
    }
    this.draw = function() {
     this.computeOptimumLocation(0.1);
     console.log('draw');
    };
   }
   
   ###in closures the parent functions variables will stay even after completions of the closure function.
   
   ##getters and setters in objects##
   Object.defineProperty(this, 'name', {
    get: function() {
     return name;
    },
    set: function(value) {
     name = value;
    }
   });
   
   circle.name = 'naresh';
   
   Prototype is the concept of inheritance in javascript
   basically every object has property called prototype where you can add methods and properties to it. And when you create other objects from this object the newly created object will auntomatically inherit the property of the parent. but not by including in its own property but instead it uses from it's parent prototype properties and methods. The way it works is when you call a particular method on an object it first looks at it's own properties to see if it's there if it's not there then it will look at it's parent and if it's find it there then it will execute it. so this way the objects are much ligter and doesn't carry all this methods with it.
   
   For example if you carried a thousand objects, you won't have to include all of those methods. it's automatically available to you by prototype inheritance.
   
   #### prototype ####
   
   var Employee = {
     company: 'xyz'
   }
   var emp1 = Object.create(Employee);
   delete emp1.company
   console.log(emp1.company); // xyz
   
   The output would be xyz. Here, emp1 object has company as its prototype property. The delete operator doesn't delete prototype property.
   
   emp1 object doesn't have company as its own property. You can test it console.log(emp1.hasOwnProperty('company')); //output : false. However, we can delete the company property directly from theEmployee object using delete Employee.company. Or, we can also delete the emp1 object using the __proto__ property delete emp1.__proto__.company.
   
   
   ## Objec.freeze ##
   Don't allow user to add any property on the object
   
   let profile = { name: 'naresh' };
   profile.age = '25' // don't allow the user to add/remove properties like this
   
   solution
   let profile = { name: 'naresh' };
   Object.freeze(profile); // will not allow to add/remove or even change the existing properties
   profile.age = 3;
   console.log(profile); // will not have the age.
   
   ## Objec.seal ## // doesn't allow to add/remove prop but can update existing properties
   
   ## Object.defineProperty ##
   we can define readonly properties in objects even you can have getters and setters.
   
   let profile = { name: 'naresh' };
   Object.defineProperty( profile, 'age', {
    value: 3,
    writable: false,
    get: function() {
     return name;
    },
    set: function(value) {
     name = value;
    }
   });
   

   =========================================================
   ##Call(), Apply() and Bind() methods##

   var car = {
       registrationNumber: "GA12345",
       brand: "Toyota",
   
       displayDetails: function(){
           console.log(this.registrationNumber + " " + this.brand);
       }
   }
   
    var myCarDetails = car.displayDetails.bind(car);
    displayDetails.apply(car, ["Vivian"]); 
    displayDetails.call(car, "Vivian"); 

   ------------------------------------------------
   Call(), Apply() and Bind() methods can come in handy when setting the “this” value.
   these are Function.prototype properties.
   
   * “this” always refers to an object.
   * “this” refers to an object which calls the function it contains.
   * In the global context “this” refers to either window object or is undefined if the ‘strict mode’ is used.
   
   var car = {
       registrationNumber: "GA12345",
       brand: "Toyota",
   
       displayDetails: function(){
           console.log(this.registrationNumber + " " + this.brand);
       }
   }
   The above will work perfectly fine as long as we use it this way:
   
   car.displayDetails(); // GA12345 Toyota
   But what if we want to borrow a method?
   
   var myCarDetails =  car.displayDetails;
   myCarDetails();
   Well, this won’t work as the “this” will be now assigned to the global context which doesn’t have neither the registrationNumber nor the brand property.
   
   The bind() Method
   For such cases we can use the ECMAScript 5 bind() method of the Function.prototype property. This means bind() can be used by every single function.
   
   var myCarDetails = car.displayDetails.bind(car);

   myCarDetails(); // GA12345 Toyota
   The bind() method creates a new function where “this” refers to the parameter in the parenthesis in the above case “car”. This way the bind() method enables calling a function with a specified “this” value.
   
   What if we would like to pass a parameter to the displayDetails function? We can use the bind method again. The following argument of the bind() method will provide an argument to the function bind() is called on.
   
   Let me rewrite the car object:
   
   var car = {
       registrationNumber: "GA12345",
       brand: "Toyota",
   
       displayDetails: function(ownerName){
           console.log(ownerName + ", this is your car: " + this.registrationNumber + " " + this.brand);
       }
   }
   Example of passing arguments with bind():
   
   var myCarDetails = car.displayDetails.bind(car, "Vivian"); // Vivian, this is your car: GA12345 Toyota
   call() and apply() methods
   Similar but slightly different usage provide the call() and apply() methods which also belong to the Function.prototype property.
   
   
   # This time there is a car object without the displayDetails function, which is located in the global context.
   
   var car = {
       registrationNumber: "GA12345",
       brand: "Toyota"
   }
   
   function displayDetails(ownerName) {
       console.log(ownerName + ", this is your car: " + this.registrationNumber + " " + this.brand);
   }
   We can use the apply() function:
   
   displayDetails.apply(car, ["Vivian"]); // Vivian, this is your car: GA12345 Toyota
   Or
   
   displayDetails.call(car, "Vivian"); // Vivian, this is your car: GA12345 Toyota
   Note that when using the apply() function the parameter must be placed in an array. Call() accepts both an array of parameters and a parameter itself. Both are great tools for borrowing functions in JavaScript.
   
   bind(), call() and apply() functions can make your life easier when you need to set the value of ‘this’.


*/