/*

Cold Observables: (Observable)
=====================
    starts producing values only when a subscription is made to them
    each subscription triggers a separate execution and subscribers receive their own independent stream of data.
    ex: HTTP requests, user input events, timers and intervals

    import { interval } from 'rxjs';
    const coldObservable = interval(1000); // Cold observable emitting values every second

Hot Observables: (Subject/BehaviourSubject)
=====================
    emit values continuously regardless of whether there are any subscribers. 
    Subscribers will share the same stream of values, 
    and late subscribers may miss previously emitted values.
    ex: mouse movements, websocket streams, or any other event stream that emits values continuously.

    import { fromEvent } from 'rxjs';
    const hotObservable = fromEvent(document, 'click'); // Hot observable emitting click events

cold to hot observables
===========================
You can convert cold observables into hot observables using techniques like multicasting
RxJS provides operators like share, publish, publishReplay, and shareReplay for multicasting.

import { interval } from 'rxjs';
import { share } from 'rxjs/operators';

const coldObservable = interval(1000).pipe(share()); // Convert cold observable to hot observable using share operator



*/