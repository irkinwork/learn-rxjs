import {AsyncSubject} from 'rxjs';

const observer = {
    next: (v) => console.log('next', v),
    error: (v) => console.log('error', v),
    complete: (v) => console.log('complete', v),
};

const subject = new AsyncSubject();

subject.subscribe(observer)
subject.subscribe(observer);

subject.next('hello');
subject.next('world');
subject.next('goodbye');

subject.complete('complete');

// emit only last value