/*

switchMap, concatMap, mergeMap/flatMap, exhaustMap (higherorder operators in rxjs)
- basically they Maps each emitted value to another observable

| Operator     | Cancels Prev | Runs in Order | Parallel | Ignores New |
| ------------ | ------------ | ------------- | -------- | ----------- |
| `switchMap`  | ✅            | ❌             | ✅        | ❌           |
| `concatMap`  | ❌            | ✅             | ❌        | ❌           |
| `mergeMap`   | ❌            | ❌             | ✅        | ❌           |
| `exhaustMap` | ❌            | ❌             | ❌        | ✅           |


of('A', 'B', 'C').pipe(
    swichMap(letter => of(letter).pipe(delay(1000)))
  ).subscribe(console.log);

| Operator     | Output                 | Timeline                     |
| ------------ | ---------------------- | ---------------------------- |
| `switchMap`  | C                      | 1s after C received (only C) |
| `concatMap`  | A, B, C                | 1s, 2s, 3s                   |
| `mergeMap`   | A, B, C (all together) | \~1s (order not guaranteed)  |
| `exhaustMap` | A                      | 1s (only A)                  |

USE CASE
---------
| Operator         | Description                                                | Cancels Previous? | Concurrent? | Real-World Use Case Example                                                              |
| ---------------- | ---------------------------------------------------------- | ----------------- | ----------- | ---------------------------------------------------------------------------------------- |
| **`switchMap`**  | Switches to new inner observable; cancels the previous one | ✅ Yes             | ❌ No        | 🔍 **Autocomplete search**: cancel old API calls as user types new characters            |
| **`concatMap`**  | Queues emissions; runs inner observables **sequentially**  | ❌ No              | ❌ No        | 📝 **Save form steps one after another**: ensures each step is submitted in order        |
| **`mergeMap`**   | Runs all inner observables in **parallel**                 | ❌ No              | ✅ Yes       | 🔄 **Load images concurrently** or **send parallel API calls** (e.g., bulk delete items) |
| **`exhaustMap`** | Ignores new inner observable if one is already running     | ✅ Skips new       | ❌ No        | 🔐 **Login button click**: ignore repeated clicks while one login request is in progress |


// C
of('A', 'B', 'C').pipe(swichMap(letter => of(letter).pipe(delay(1000)))).subscribe(console.log);
// A B C -> at a time

of('A', 'B', 'C').pipe(mergeMap(letter => of(letter).pipe(delay(1000)))).subscribe(console.log);
// A B C -> after 1 sec each will print

of('A', 'B', 'C').pipe(concatMap(letter => of(letter).pipe(delay(1000)))).subscribe(console.log);


switchMap  (Cancels previous inner observable subscriptions)
  - useful for scenarios like autocomplete
  - Cancels previous inner observable subscriptions when a new value arrives,
    [1,2,3,4] ==> 4

    t -> cancel
    te -> cancel
    tes -> cancel
    test -> 200 success

concatMap - (one at a time, sequential execution, maintains order)
  - Useful for sequential HTTP requests
  - maintains the order
  - ensures the order of emitted values, it processes each observable one at a time

  [1,2,3,4] ==> 1,2,3,4

   t -> 200 success
   te -> 200 success
   tes -> 200 success
   test -> 200 success

mergeMap/flatMap - (sequential execution similar to concatMap, can't predict order)
  - similar to concatMap
  - can't predict the order

  [1,2,3,4] ==> 3,4,1,2

   t -> 200 success 
   te -> 200 success
   tes -> 200 success
   test -> 200 success

exhaustMap - 
    - prevents multiple HTTP requests being sent at once
    - particularly in response to user events like button clicks.

    [1,2,3,4] ==> 1 //takes the 't' from 'test' and fires it first and ignores rest of the api calls until first one finish

    t -> 200 success
    te -> ignores
    tes -> ignores
    test -> 200 success

====================================

import { of, interval } from 'rxjs';
import { mergeMap, switchMap, concatMap, flatMap, exhaustMap } from 'rxjs/operators';

const source1 = of('A', 'B', 'C');

source1.pipe(
  mergeMap(letter => of(letter).pipe(delay(1000)))
).subscribe(console.log);

============
of('A','B','C').pipe(mergeMap(letter => of(letter).pipe(delay(1000)))).subscribe(console.log);
// A, B, C
============

=====================================

<button (click)="fetchDataSwitchMap()">Fetch Data with switchMap</button>

fetchData(): Observable<string> {
  return of('Data fetched successfully!').pipe(delay(1000)); // Simulate delay
}

fetchDataSwitchMap() {
  this.fetchData()
    .pipe(
      switchMap(data => {
        // Simulate another HTTP request based on the previous result
        return this.fetchData();
      })
    )
    .subscribe(result => {
      console.log(result);
    });
}


*/
