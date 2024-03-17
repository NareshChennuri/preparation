class Car {
    constructor(model) {
        this.model = model;
    }
    drive() {
        console.log(`Driving a ${this.model}`);
    }
}

class CarFactory {
    static createCar(model) {
        return new Car(model);
    }
}

const sedan = CarFactory.createCar('Sedan');
sedan.drive();  // Outputs: "Driving a Sedan"