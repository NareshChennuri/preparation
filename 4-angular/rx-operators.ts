/*

RxJS operators are pure function that takes an observable as input and provides the output also in the form of observable. We have to use a pipe() method to work with operators.

Following is a list of most used operators in RxJS:

Creation Operator
Mathematical Operator
Join Operator
Transformation Operator
Filtering Operator
Utility Operator
Conditional Operator
Multicasting Operator
Error handling Operator

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

*/