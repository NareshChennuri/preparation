/**

SUBJECT (MULTICAST)
----------
Subject is useful for broadcasting events to multiple subscribers.
Subject is an observable and we can subscribe to it

We can use 3 methods on Subject
    - subscribe() activate the subscription
    - next() you can pass new values and all the subscribers will receive it
    - complete() you can close all the subscriptions here

    
 
Feature	                Observable (Cold)       Subject (Hot)
--------------------------------------------------------------------------
Emit new value	        No (outside source)	    Yes (subject.next(value))
Subscribers	            Unicast	                Multicast
Typical Usage	        Data source	            Data/event bus
Read/Write	            Read only	            Read and Write


Observable
------------------
Unicast: Each subscriber gets its own independent execution.
Read-only for consumers: You can’t push new values from outside (except using an operator inside the observable).
Example: HTTP calls, timers, streams that emit data but don’t accept it from outside.

Subject
------------------
Multicast: One value emitted is shared with all subscribers.
Read/Write: You can push values into the stream from anywhere using .next().
Acts as both an Observable and Observer: You can subscribe to it and emit new values to it.

| Subject Type      | Stores Value   | Late Subscribers Get  | Emits Without Data  | Use Case                                   |
| ----------------- | ------------   | --------------------  | ------------------  | ------------------------------------------ |
| `Subject`         | ❌ No         | ❌ Nothing            | ✅ Yes              | Event emitters, click handlers             |
| `BehaviorSubject` | ✅ Last       | ✅ Latest             | ❌ Needs value      | App state, selected item, theme switch     |
| `ReplaySubject`   | ✅ Last N     | ✅ Last N values      | ✅ Yes              | Logs, playback, shared streams             |
| `Subject<void>`   | ❌ No         | ❌ Nothing            | ✅ Only void        | Triggers with no payload (refresh, close)  |
| `AsyncSubject`    | ✅ Final      | ✅ Final on complete  | ✅ Yes              | Final result, config loading, summary data |



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