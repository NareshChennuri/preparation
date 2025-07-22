/*

AsyncSubject only sends the latest value to subscribers when it's COMPLETED.

AsyncSubject is very useful for Ajax requests. 

| Use Case                                                          | Why `AsyncSubject` Works  |
| ----------------------------------------------------------------- | ------------------------- |
| Final exam result or score                                        | Only final result matters |
| API call where only last emitted value matters                    | Avoids duplicates, caches |
| One-time app initialization data                                  | Broadcast after ready     |
| File upload progress (return only the final status)               | Final status only         |
| Socket or polling stream where only final count/summary is needed | Share result to all       |


    const rxjs = require('rxjs');
    const { AsyncSubject } = rxjs; 

    const subject = new AsyncSubject();

    subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);

    subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
    });

    subject.next(5);
    subject.complete();

// Output

"observerA: 5"
"observerB: 5"

*/