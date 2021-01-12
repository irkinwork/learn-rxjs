import { Subject, Observable, interval, pipe } from 'rxjs';
import {multicast, refCount, share, tap} from 'rxjs/operators'
/*
 * Any code samples you want to play with can go in this file.
 * Updates will trigger a live reload on http://localhost:1234/
 * after running npm start.
 */

const observer = {
    next: (x) => console.log('next', x),
    error: (x) => console.log('error', x),
    complete: (x) => console.log('complete', x),
};

const interval$ = interval(200).pipe(
    tap(i => console.log('new interval', i))
);

const multicasted = interval$.pipe(
    // multicast(() => new Subject()),
    // refCount(),
    share()
);

// const connected = multicasted.connect()

const subOne = multicasted.subscribe(observer);
const subTwo = multicasted.subscribe(observer);

setTimeout(() => {
    subOne.unsubscribe()
    subTwo.unsubscribe()
    // connected.unsubscribe()
}, 3000)