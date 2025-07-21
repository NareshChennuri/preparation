/*

| Operator           | Emits when...              | Output                      | Use case                       |
| ------------------ | -------------------------- | --------------------------- | ------------------------------ |
| **forkJoin**       | All complete               | Last values of each (once)  | Wait for all to finish         |
| **combineLatest**  | Any source emits           | Latest values from all      | React to any change            |
| **zip**            | Each source emits in order | Paired values (by index)    | Match up emissions in sequence |
| **withLatestFrom** | Main source emits          | Main + latest from other(s) | Grab latest “extra” on event   |



forkJoin: (multiple Http calls parallel - combines the results once all done)
-------------
  Use Case: When you need to make several HTTP requests in parallel and wait for all of them to complete before taking further action.

  Example: Fetching data from multiple endpoints and processing the combined result once all requests are finished.


  forkJoin([
    api.getUser(),
    api.getOrders(),
    api.getNotifications()
  ]).subscribe(([user, orders, notifications]) => {
    // Use all results here
  });



zip: (deprecated)
-------------
  Use Case: When you need to combine the latest values from multiple streams, but only when all streams have emitted a value.

  Example: Synchronizing data from different sources where each source provides related information, and you want to process this data only when all sources have new updates.

  zip([of(1, 2, 3), of('a', 'b', 'c')])
  .subscribe(([num, char]) => { // (1, 'a'), (2, 'b'), ... });


combineLatest:
-------------
  Use Case: When you need to combine the latest values from multiple streams and emit a new value whenever any of the source streams emit a value.

  Example: Keeping track of the state of multiple UI inputs and performing some action whenever any input changes.


  combineLatest([input1.valueChanges, input2.valueChanges])
  .subscribe(([val1, val2]) => { // runs whenever either changes  });


withLatestFrom:
-------------
  Use Case: When you want to combine the latest value from one observable with the latest values from other observables whenever a particular observable emits a value.

  Example: Implementing a form where you want to validate user input whenever a submit button is clicked, but you also want to include the latest state of other inputs in the validation.


forkJoin:
-------------
export class App implements OnInit {
  sources = [
    this.http.get('https://jsonplaceholder.typicode.com/users/1'),
    this.http.get('https://jsonplaceholder.typicode.com/users/2'),
    this.http.get('https://jsonplaceholder.typicode.com/users/3'),
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    forkJoin(this.sources).subscribe(([result1, result2, result3]) => {
     console.log('Results:', result1, result2, result3);
    });
  }
}


import { forkJoin, of } from 'rxjs';

const request1$ = of('Result from Request 1').delay(1000);
const request2$ = of('Result from Request 2').delay(1500);

forkJoin([request1$, request2$]).subscribe(([result1, result2]) => {
  console.log('Results:', result1, result2);
});

============================================

zip: (deprecated)
-------------
The zip operator combines the latest values from multiple observables into an array for each emission. 
It waits for all observables to emit at least one value before emitting the first combined array of values.

Example: Combine two counters that increment at different rates:


import { interval, zip } from 'rxjs';

const counter1$ = interval(1000);
const counter2$ = interval(500);

zip(counter1$, counter2$).subscribe(([count1, count2]) => {
  console.log('Counts:', count1, count2);
});

====================================================

withLatestFrom:
-------------
The withLatestFrom operator combines the latest value from the source observable with the latest values from one or more other observables. It emits only when the source observable emits.

Example: You want to log the latest user action along with the current time:

import { interval } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

const userActions$ = interval(1000);
const currentTime$ = interval(5000);

userActions$.pipe(
  withLatestFrom(currentTime$)
).subscribe(([action, time]) => {
  console.log('User Action:', action, 'Current Time:', time);
});

=============================================================

combineLatest: (deprecated)
-------------
The combineLatest operator combines the latest values from multiple observables into an array for each emission. 
It emits whenever any of the combined observables emits a value.
Example: Combine the latest values from two input fields to update a preview:

import { fromEvent } from 'rxjs';
import { combineLatest } from 'rxjs/operators';

const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');

const input1$ = fromEvent(input1, 'input');
const input2$ = fromEvent(input2, 'input');

combineLatest([input1$, input2$]).subscribe(([val1, val2]) => {
  console.log('Input 1:', val1.target.value, 'Input 2:', val2.target.value);
  // Update preview or perform other actions with the combined values
});


*/