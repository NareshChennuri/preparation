/*
**

asyncPipe:
---------------
- can be used in html templates to automatically subscribe to an Observable or Promise
- it will directly bind the emitted values to the template

import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-example',
  template: `
    <div *ngIf="data$ | async as data">
      <p>{{ data }}</p>
    </div>
  `,
})
export class ExampleComponent {
  data$: Observable<string>;

  constructor() {
    // Simulating an Observable data source
    this.data$ = of('Hello, world!').pipe(
      // Simulating asynchronous behavior with a delay
      delay(1000)
    );
  }
}


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-example',
  template: `
    <div *ngIf="userData$ | async as userData; else loading">
      <p>{{ userData.name }}</p>
      <p>{{ userData.email }}</p>
    </div>
    <ng-template #loading>
      <p>Loading user data...</p>
    </ng-template>
  `,
})
export class ExampleComponent {
  userData$: Observable<any>;

  constructor(private http: HttpClient) {
    // Making an HTTP request to fetch user data
    this.userData$ = this.http.get<any>('https://jsonplaceholder.typicode.com/users/1');
  }
}




With AsyncPipe we can use promises and observables directly in our template, 
async pipe automatically subscribes and unsubscribes from Observables as the component gets instantiated or destroyed
it makes easier to read and more declarative with fewer state variables in our component classes.
without having to store the result on an intermediate property or variable.

AsyncPipe accepts as argument an observable or a promise, 
calls subcribe or attaches a then handler, 
then waits for the asynchronous result before passing it through to the caller.



// data.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: string[] = ['Angular', 'React', 'Vue'];

  getData(): Observable<string[]> {
    // Simulate fetching data asynchronously
    return of(this.data).pipe(
      // Simulate delay using RxJS delay operator
      delay(1000)
    );
  }
}

// app.component.ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `
    <h2>Async Pipe Example</h2>
    <ul>
      <li *ngFor="let item of data$ | async">{{ item }}</li>       ########## async
    </ul>
  `,
})
export class AppComponent {
  data$: Observable<string[]>;

  constructor(private dataService: DataService) {
    // Assign the Observable returned by the DataService to data$
    this.data$ = this.dataService.getData();
  }
}

*/
