/*

The BehaviourSubject is a variant of the Subject. 
    - initial value
    - also holds the last emitted value

BehaviourSubject is very userful 
    - when you wants to set some initial data.
    - behaviourSubject knows about the current value and when you create a new subscriber after emitting some data 
      you can pass the current value to that subscriber
      (which is not possible with normal Subject)


    * Inital value
    * Also holds the last emitted value    
    * 
    * use the BehaviourSubject to give a subscriber the last known value of the Observable  

    const rxjs = require('rxjs');
    const { BehaviorSubject } = rxjs;

    const subject = new BehaviorSubject(0); // 0 is the initial value
    
    subject.subscribe({
        next: (v) => console.log(`observerA: ${v}`)
    });
    
    subject.next(1);
    subject.next(2);
    
    subject.subscribe({
        next: (v) => console.log(`observerB: ${v}`)
    });
    
    subject.next(3);

    //Output

    "observerA: 0"
    "observerA: 1"
    "observerA: 2"
    "observerB: 2"
    "observerA: 3"
    "observerB: 3"

    */