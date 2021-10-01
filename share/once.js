import { interval, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

const observer = {
  next: x => console.log('next', x),
  complete: () => console.log('complete'),
  error: x => console.log('error', x),
};

const observer2 = {
  next: x => console.log('next2', x),
  complete: () => console.log('complete'),
  error: x => console.log('error', x),
};

const subject = new Subject();

const subscription = subject.subscribe(observer);

// subject.next('Hello');

const subscriptionTwo = subject.subscribe(observer2);

// subject.next('World');

const interval$ = interval(1000).pipe(tap(value => console.log('new interval', value)));

// вместо обсервера подписываемся на сабджект который подписан на обсервер
// тогда побочные эффекты сработаю только раз
interval$.subscribe(subject);
