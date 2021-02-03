import {asyncScheduler, of} from 'rxjs';
import { observeOn, subscribeOn, tap } from 'rxjs/operators';

const observer = {
    next: (v) => console.log('next', v),
    error: (v) => console.log('error', v),
    complete: () => console.log('complete'),
};

// work, delay, state
// const sub = asyncScheduler.schedule( // similar to setTimeout
//     console.log,
//     2000,
//     "Hello World!"
// );

// sub.unsubscribe()
// of(4, 5, 6, asyncScheduler).subscribe(observer);
of(4, 5, 6).pipe(
    tap(v => console.log('from tap', v)),
    // observeOn(asyncScheduler, 3000),
    subscribeOn(asyncScheduler, 3000),
).subscribe(observer)
of(1,2,3).subscribe(observer);
console.log('sync');