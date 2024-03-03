/*

> npm run test

Karma is a tool for executing source code against test code inside a browser environment
Jasmine is a javascript testing framework
Protractor is an end-to-end test framework for Angular.

export class AppComponent {
  add(a: number, b: number) {
    return a + b;
  }
}

- Create test group

    describe('AppComponent', () => {
        // Here, we will write test cases
    });

- check app initialization 

    import { AppComponent } from "./app.component";
    describe('AppComponent', () => {
        // Testcase that mentioned with it()
        it('should component initialized', () => {
            const component = new AppComponent();
            expect(component).toBeTruthy();
        });
    });

- Write a test case for add() method.

    import { AppComponent } from "./app.component";

    describe('AppComponent', () => {
        // Testcase that mentioned with it()
        it('should component initialized', () => {
            const component = new AppComponent();
            expect(component).toBeTruthy();
        });
        // Testcase for add method
        it('should test sum of two numbers', () => {
            // Arrange
            const component = new AppComponent();
            const a = 5;
            const b = 5;
            // Act
            const total = component.add(a, b);
            // Assert
            expect(total).toEqual(10); 
        });
    });

- write initialization code in hooks 
    
    beforeAll(): Called once before all the specification
    beforeEach(): Called before each test specification
    afterAll(): Called once after all the specifications.
    afterEach(): Called after each test specification
    

    import { AppComponent } from "./app.component";

    describe('AppComponent', () => {
        let component: AppComponent;
        
        beforeEach(() => {
            component = new AppComponent();
        });

        it('should component initialized', () => {
            expect(component).toBeTruthy();
        });

        it('should test sum of two numbers', () => {
            const a = 5;
            const b = 5;
            const total = component.add(a, b);
            expect(total).toEqual(10)
        });
    });    

expect(true).toBe(true)
expect(true).not.toBe(true)
expect(a).toEqual(bar)
expect(message).toMatch(/bar/)
expect(message).toMatch('bar')
expect(a.foo).toBeDefined()
expect(a.foo).toBeUndefined()
expect(a.foo).toBeNull()
expect(a.foo).toBeTruthy()
expect(a.foo).toBeFalsy()
expect(message).toContain('hello')
expect(pi).toBeGreaterThan(3)
expect(pi).toBeLessThan(4)
expect(pi).toBeCloseTo(3.1415, 0.1)

*/