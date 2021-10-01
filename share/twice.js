import { interval, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

const observer = {
  next: x => console.log('next', x),
  complete: () => console.log('complete'),
  error: x => console.log('error', x),
};

const subject = new Subject();

// подписываемся на Subject в первый раз
const subscription = subject.subscribe(observer);

subject.next('Hello');

// подписываемся на Subject во второй раз
const subscriptionTwo = subject.subscribe(observer);

subject.next('World');

const interval$ = interval(1000).pipe(tap(value => console.log('new interval', value)));

// подписались два раза, по два раза получаем побочные эффекты
// хотим, чтобы побочные эффекты после двух подписок срабатывали только раз

interval$.subscribe(observer);
interval$.subscribe(observer);
