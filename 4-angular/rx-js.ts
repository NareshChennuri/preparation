/**

RxJs is a third party Javascript library which provides reactive programming support. 
It allows you to work with asynchronous data streams and handle events - over the time. 

basically RxJs is based on Observables, which are data streams 
you can be subscribe and process using the rxjs operators. 

It provides a powerful and flexible way to handle complex asynchronous operations in Angular.

STREAMS
-------

A stream is basically a sequence of data values over time.
ex: Timers, API responses, chat texts, input data from forms.

These all represent data values that will be collected over time, hence the name stream.


OBSERVABLES
-----------

Can be used for Emitting multiple values asynchronously 

Observables are considered lazy, so in case of no subscription there will be no emission of data values

Observables can be resolved multiple times as opposed to functions or promises

Error handling is easy in Observables rather than promises

    Life Cycles of Observables

    - Creation
    - Subscription
    - Execution
    - Destruction

NOTE:    
An Observable is UNICAST. 
An Observer and its Subscriber have a one-to-one relationship. 
Each subscribed Observer owns an independent execution of the Observable.

With the Observables the data is sent to the first subscriber and will finish before it continues to the next subscriber.
Each call to observable.subscribe triggers its independent setup for that given subscriber.


OBSERVERS
-----------

Observer connects to the Observables with the help of subscription.

observer that subscribes can deliver three values to the Observable

    - next value
    - error value
    - complete value
*/
