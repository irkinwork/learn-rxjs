import { interval, Subject } from 'rxjs';
import { mapTo, share, tap } from 'rxjs/operators';

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

// const subscriptionTwo = subject.subscribe(observer);

// subject.next('World');

const interval$ = interval(1000);

// аналогично: const multicasted$ = interval$.pipe(multicast(() => new Subject()));
const multicasted$ = interval$.pipe(share());

// подписываем мультикастед на обсерверы. аналогично тому, как мы это делали в первый раз, когда делали две подписки
// теперь побочные эффекты происходят только один раз.
const subOne = multicasted$.subscribe(observer);
const subTwo = multicasted$.subscribe(observer2);

setTimeout(() => {
  subOne.unsubscribe();
  subTwo.unsubscribe();
}, 3000);

// итого: если нам нужно подписаться дважды на обсервер (один и тот же или разные - не важно), но мы не хотим, чтобы побочные эффекты срабатывали дважды - нужно для потока использовать оператор share.
// в примере это работает с tap. а с чем еще работает?
