/**

SUBJECT (MULTICAST)
----------
Subject is useful for broadcasting events to multiple subscribers.
Subject is an observable and we can subscribe to it

We can use 3 methods on Subject
    - subscribe() activate the subscription
    - next() you can pass new values and all the subscribers will receive it
    - complete() you can close all the subscriptions here

When to use Subject:

When you need multiple subscribers and all the subscribers needs to get the new values simultaneously, you need a Subject.

BehaviourSubject
  - when you need initial value & the last given value.

ReplaySubject 
  - is used to get the recent fixed amount of emitted values, to new subscribers.
  - takes buffer size and time in milliseconds (only valid for given time)

  const subject = new ReplaySubject(2); // buffer 2 recently emitted values for new subscribers
  const subject = new ReplaySubject(100, 500); // it can keep a hundred values in memory and pass it to new subscribers, but those values are valid for 500 milliseconds.

AsyncSubject 
  - only sends the latest value to subscribers when it's COMPLETED.
  - it is very useful for Ajax requests.
  const subject = new AsyncSubject();

Subject 
  - if you don't want to pass any value but just want to hook into the event.




const rxjs = require('rxjs');
const { Subject } = rxjs;

const subject = new Subject();
 
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
subject.next(1);
subject.next(2);

// Output

"observerA: 1"
"observerB: 1"
"observerA: 2"
"observerB: 2"


*/