import { fromEvent } from 'rxjs';
import {ajax} from 'rxjs/ajax';
import { mergeMapTo, shareReplay } from 'rxjs/operators';

const observer = {
    next: (v) => console.log('next', v),
    error: (v) => console.log('error', v),
    complete: (v) => console.log('complete', v),
};

const ajax$ = ajax('https://api.github.com/users/octocat');

const click$ = fromEvent(document, 'click');

const clickRequest$ = click$.pipe(
    mergeMapTo(ajax$),
    shareReplay(1, 2000),
);

clickRequest$.subscribe(x => console.log('clickRequest', x))

setTimeout(() => {
    console.log('subscribing!')
    clickRequest$.subscribe(x => console.log('clickRequest', x))
}, 5000)