function Dog(name) {
    this.name = name;
}

Dog.prototype.bark = function() {
    console.log(`${this.name} says woof`);
};

const dog1 = new Dog('Max');
dog1.bark();  // Outputs: "Max says woof"