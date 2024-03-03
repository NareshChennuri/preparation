/**

Observables are used in handling asynchronous operations. 
Observables are part of the RxJS library and they are used for handling streams of data over time. 

so, Observables represent a stream of values or events that may occur over time.

They can emit multiple values asynchronously (including primitive values, custom objects, or even other Observables.)

Creating Observables:

Angular provides various ways to create Observables, such as using the Observable.create, of, from, and other creation operators from the RxJS library.

import { Observable, of } from 'rxjs';

const myObservable = new Observable<number>((observer) => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

const numbersObservable = of(1, 2, 3);

Subscribing to Observables:
To consume the values emitted by an Observable, you subscribe to it.

myObservable.subscribe(
  (value) => console.log(`Received value: ${value}`),
  (error) => console.error(`Error: ${error}`),
  () => console.log('Observable completed')
);

Operators:

RxJS provides a wide range of operators that can be used to transform, filter, and combine Observables.

import { map, filter } from 'rxjs/operators';

const transformedObservable = numbersObservable.pipe(
  filter((num) => num % 2 === 0),
  map((num) => num * 2)
);

Async Pipe:

In Angular, the async pipe can be used to subscribe to an Observable directly in the template.
html
Copy code
<div *ngIf="(dataObservable | async) as data">
  {{ data }}
</div>
HTTP Requests:

Observables are commonly used for handling HTTP requests in Angular services.

import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

fetchData(): Observable<Data> {
  return this.http.get<Data>('https://api.example.com/data');
}

Observables are a powerful tool in Angular for dealing with asynchronous tasks, and they form the foundation of Angular's reactive programming paradigm. Understanding how to create, subscribe, and manipulate Observables is key to building responsive and efficient Angular applications.

*/