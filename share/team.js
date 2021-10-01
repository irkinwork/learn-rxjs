import { interval } from 'rxjs';
import { distinctUntilChanged, mapTo, tap, withLatestFrom, share } from 'rxjs/operators';

const observer = x => console.log('sub B');
const observer2 = x => console.log('sub C');
const observerA = a => console.log('a', a);

const a$ = interval(1000).pipe(
  mapTo(5),
  distinctUntilChanged(),
  // tap(a => console.log('a', a))
  share()
);

const b$ = interval(1000).pipe(
  withLatestFrom(a$)
  // tap(([b, a]) => console.log('a, b', a, b))
);

const c$ = interval(1000).pipe(
  withLatestFrom(a$)
  // tap(([c, a]) => console.log('a, c', a, c))
);

const sub1 = b$.subscribe(observer);
const sub2 = c$.subscribe(observer2);

setTimeout(() => {
  sub1.unsubscribe();
  sub2.unsubscribe();
}, 3000);

/*
побочные эффекты с а логгируются один раз

с share()
a 5
a, b 5 0
sub B
a, c 5 0
sub C
a, b 5 1
sub B
a, c 5 1
sub C
a, b 5 2
sub B
a, c 5 2
sub C

---

без share()
побочные эффекты логируются дважды, если мы два раза используем a$

a 5
a, b 5 0
sub B
a 5
a, c 5 0
sub C
a, b 5 1
sub B
a, c 5 1
sub C
a, b 5 2
sub B
a, c 5 2
sub C


непонятно, потому что пример с tap синтетический. что может быть вместо tap?
*/
