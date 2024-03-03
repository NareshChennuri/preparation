/*

Void Subject

In most of the scenarios where you use a Subject with subscribers, 
it's relevant that you get access to the value that has passed. 
But what if you don't need an actual value but only want to hook into the event and don't need a value. 
That's when you use a void subject.



const rxjs = require('rxjs');
const { Subject } = rxjs;

const subject = new Subject(); // Shorthand for Subject<void>

subject.subscribe({
  next: () => console.log('One second has passed')
});

setTimeout(() => subject.next(), 1000);

//Output
"One second has passed"

*/