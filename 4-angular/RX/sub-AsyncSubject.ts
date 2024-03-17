/*

AsyncSubject only sends the latest value to subscribers when it's COMPLETED.

AsyncSubject is very useful for Ajax requests. 
Because with most GET requests, you're only going to wait for one response.



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