/*

ReplaySubject is used to get the recent fixed amount of emitted values, to new subscribers.
takes buffer size and time in milliseconds (only valid for given time)

    Think of an online playlist that a DJ is playing. But you want to go back in that stream. 
    The ReplaySubject can make sure you can revert three tracks and start listening from there.

const subject = new ReplaySubject(2); // buffer 2 recently emitted values for new subscribers
const subject = new ReplaySubject(100, 500); // it can keep a hundred values in memory and pass it to new subscribers, but those values are valid for 500 milliseconds.

    const rxjs = require('rxjs');
    const { ReplaySubject } = rxjs;

    const subject = new ReplaySubject(2); // buffer 3 values for new subscribers
    
    subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
    });
    
    subject.next(1);
    subject.next(2);
    subject.next(3);
    
    subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
    });

    subject.next(4);
    subject.next(5);

// Output

"observerA: 1"
"observerA: 2"
"observerA: 3"
"observerB: 2"
"observerB: 3"
"observerA: 4"
"observerB: 4"
"observerA: 5"
"observerB: 5"

*/