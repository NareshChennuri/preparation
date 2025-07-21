/*

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


Use Observables when:
======================
- unidirectional data flow: 
    If you have a stream of data that only needs to be observed and consumed by subscribers, and you don't need to manually push values into the stream, Observables are sufficient.

- one-to-many relationship: 
    If you need to multicast a stream of data to multiple subscribers, Observables provide a unicast mechanism by default, meaning each subscription creates a separate execution of the Observable sequence. 
    This is useful for scenarios where multiple subscribers need to observe the same data stream independently.

- asynchronous data streams: 
    Observables are well-suited for representing asynchronous data streams such as HTTP requests, user input events, and other asynchronous operations.

    
Use Subjects when:
====================
- many-to-many relationship: 
    If you need to multicast a stream of data to multiple subscribers and also have the ability to manually push values into the stream, Subjects provide this flexibility. They act as both Observers and Observables, allowing you to emit values imperatively.

- event handling or communication between components: 
    Subjects are commonly used in scenarios where you need to implement event handling or inter-component communication, such as in Angular applications where Subjects can be used with services to facilitate communication between components.

- share a single stream of data among multiple subscribers: 
    If you have a single stream of data that needs to be shared among multiple subscribers, Subjects provide a convenient way to multicast values to multiple subscribers without creating separate execution contexts for each subscriber.
 

*/