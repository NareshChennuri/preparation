/*

RxJS operators 
- are pure function that 
- takes an observable as input and provides the output also in the form of observable. 
- We have to use a pipe() method to work with operators.

Following is a list of most used operators in RxJS:

| Category             | Key Operators (Examples)                                                |
| -------------------- | ----------------------------------------------------------------------- |
| **Creation**         | `of`, `from`, `interval`, `timer`, `throwError`, `range`                |
| **Mathematical**     | `count`, `max`, `min`, `reduce`                                         |
| **Join/Combination** | `merge`, `concat`, `combineLatest`, `forkJoin`, `zip`, `withLatestFrom` |
| **Transformation**   | `map`, `switchMap`, `mergeMap`, `concatMap`, `scan`, `buffer`           |
| **Filtering**        | `filter`, `take`, `takeUntil`, `skip`, `distinct`, `debounceTime`       |
| **Utility**          | `tap`, `delay`, `timeout`, `finalize`, `repeat`                         |
| **Conditional**      | `defaultIfEmpty`, `iif`, `find`, `every`                                |
| **Multicasting**     | `share`, `shareReplay`, `publish`, `shareLatest`                        |
| **Error Handling**   | `catchError`, `retry`, `retryWhen`, `onErrorResumeNext`                 |


Map :- Transforms data in a observable in to a different format.
Filter :- Allows data which meets conditions.
Merge :- This operator will combine multiple Observables into one. So if one of the
          observables emit a value the combined one will emit as well.
Concat :- only when observable completes, it will start with the next observable.
From :- This operator will turn array, promise or iterable into an observable.
debouncetime :- discard emitted values if a certain time didn't pass between the lastinput
distinctuntilchanged :- only emits a value if it is different than the last one.
pluck :- select a property to emit.
delay :- emits a value with a delay.


higher ordre funtions
mergeMap, switchMap, concatMap, flatMap, exhaustMap

of(1,2,3,4).
    pipe(map(i)=>i*2).
    subscribe((res)=> console.log(res));


ngOnInit() {
    from(['hello', 'world', 'hello', 'world', 'naresh']).
      pipe(reduce((a, i) => {
        (i in a) ? a[i]++ : a[i]=1;
        return a;
      },  <{ [key: string]: number }>{})).
      subscribe((res)=> console.log(res));
  }


 🎯 Creation Operators

 of()	Create an observable from static values. Example: of(1,2,3)
from()	Convert arrays, promises, iterables into observables. Example: from([1,2,3])
interval()	Emit sequential numbers at fixed time intervals (for polling, timers).
timer()	Emit after a delay, or after delay + interval. Good for delayed API calls.
fromEvent()	Convert DOM events into observables (clicks, keyups).

🔄 Transformation Operators

map()	Transform emitted values. Example: convert API response to DTO.
pluck()	Extract a property from emitted objects. Example: pluck('name').
scan()	Like reduce — accumulate values over time. Useful for running totals.
bufferTime()	Collect values for a time window and emit as an array.
concatMap()	Map and subscribe in order (sequential async calls).
mergeMap()	Map and subscribe in parallel (parallel async calls).
switchMap()	Cancel previous subscription when new value arrives (autocomplete, search).
exhaustMap()	Ignore new emissions while current one is active (login button multiple clicks).

🎛️ Filtering Operators

filter()	Only emit values that satisfy a condition. Example: filter(x => x > 10).
take(n)	Complete after n emissions.
takeUntil()	Keep emitting until another observable emits (unsubscribe automatically).
first()	Take only the first value.
last()	Take only the last value before completion.
skip(n)	Ignore the first n emissions.
distinctUntilChanged()	Suppress duplicate consecutive values (avoid re-rendering in Angular).
debounceTime(ms)	Emit latest value after silence period. Useful for search/autocomplete.
throttleTime(ms)	Emit first value, then ignore others for duration (rate limiting).

🔗 Combination Operators

combineLatest()	Combine latest values from multiple observables (e.g., filters + API).
forkJoin()	Wait for multiple observables to complete, then emit once (parallel API calls).
zip()	Pair values from multiple observables by emission index.
concat()	Run observables sequentially (one after another).
merge()	Run observables concurrently (interleave emissions).
withLatestFrom()	Combine source emission with latest from another observable.

⚡ Error Handling & Utility Operators

catchError()	Handle errors gracefully and return fallback observable.
retry(n)	Retry source observable n times on error.
retryWhen()	Retry with custom logic (e.g., exponential backoff).
tap()	Perform side effects (logging, debugging) without changing value.
finalize()	Run cleanup logic when observable completes/errors/unsubscribes.
delay(ms)	Delay emission of values (simulate API latency).
timeout(ms)	Throw error if no value is emitted within the given time.
shareReplay()	Cache and replay last emitted values (useful for caching API responses in Angular). 

*/