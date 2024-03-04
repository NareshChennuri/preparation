/*

Angular uses Jasmine & Karma

Jasmine
- behaviour-driven javascript testing framework
Karma
- is a tool for executing the test suites
Protractor
- is an E2E test framework 

Cyper (E2E) test framework similar to Selinium 


- in Jasmine we write test specs and they are grouped in test suites

- test suites are defined in Jasmine "describe()"

- test specification is described by "it()"

- it should described the functional specification of the feature we are testing

- utility functions
    pending() // making test case in pending state
    fail() // making the test case to fail
    expect().toBe() // test case assertions
    spyOn(logger, 'log');

//calculator.service.spec.ts
------------------------------------
import {CaclulateService} from './calculator.service';
import {LoggerService} from './logger.service';

describe(CalculateService, () => {
    it('should add two numbers', () => {
        const calculator = new CalculatorService(new LoggerService());
        const result = calculator.add(2,2);
        expect(result).toBe(4, "unexpected addition result");
    });

    if('should subtract two numbers', () => {
        const logger = new LoggerService();
        spyOn(logger, 'log'); // spying on 'log' method
        const calculator = new Calculator(logger);
        const result = calculator.subtract(2,2);
        expect(result).toBe(0, "unexpected subtraction result");
        expect(logger.log).toHaveBeenCalledTimes(1); // define how many times 'log' function is called
    });
});

> npm run test

--------------------------

const logger = jasmine.createSpyObj('LoggerService', ["log"]); // spying on LoggerService - log method

--------------------------
beforeEach() // initialization logic goes here

describe('CalculatorService', () => {

    let calculator: CalculatorService,
        loggerSpy: any;

    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
        calculator = new CalculatorService(loggerSpy);
    })

    if('should ad two numbers', ()=> {
        const result = calculator.add(2,2);
        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })
});

--------------------------------
xdescribe() // disabling the test suite
xit() // disabling the test spec

fdescribe() // focus on describe block
fit() // focus on test spec (only this test spec will run remaining test will be skipped)
--------------------------------
HttpClientTestingModule // for mocking http calls

let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [CoursesService, HttpClientTestingModule]
    });
    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
});

it('should retrieve all courses', () => {
    coursesService.findAllCourses()
    .subscribe(courses => {
        expect(courses).toBeTruthy('No courses returned');
        expect(courses.length).toBe(12, 'Incorrect number of courses');
        const course = courses.find(course => course.id == 12);
        expect(course.titles.description).toBe('Angular Testing Course');
    });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({payload: Object.values(COURSES)}); // from mock data
    httpTestingController.verify();
});

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