import {asapScheduler, asyncScheduler, of, range} from 'rxjs';
import { observeOn, subscribeOn, tap } from 'rxjs/operators';

const observer = {
    next: (v) => console.log('next', v),
    error: (v) => console.log('error', v),
    complete: () => console.log('complete'),
};

// work, delay, state
asyncScheduler.schedule( // similar to setTimeout
    console.log,
    2000,
    "asyncScheduler!"
);
asapScheduler.schedule( // similar to queuemicrotask / Promise.resolve / block ui until queue is cleared
    console.log,
    2000,
    "asapScheduler!"
);
// queueMicrotask(() => console.log(
//     'from microtask'
// ))
// Promise.resolve('from promise').then(console.log)

const counter = document.getElementById('counter');
range(1,5).subscribe(observer)
range(1,100000, asyncScheduler).subscribe((val) => {
    counter.innerHTML = val;
})
console.log('sync');