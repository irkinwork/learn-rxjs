import { interval, Subject } from 'rxjs';
import { multicast, tap } from 'rxjs/operators';

const observer = {
  next: x => console.log('next', x),
  complete: () => console.log('complete'),
  error: x => console.log('error', x),
};

// subject.next('Hello');

// const subscriptionTwo = subject.subscribe(observer);

// subject.next('World');

const interval$ = interval(1000).pipe(tap(value => console.log('new interval', value)));

// аналогично: interval$.subscribe(subject)
const multicasted$ = interval$.pipe(multicast(() => new Subject()));

// специальный метод, который запускает сабджект
const connectedSub = multicasted$.connect();

// подписываем мультикастед на обсерверы. аналогично тому, как мы это делали в первый раз, когда делали две подписки
// теперь побочные эффекты происходят только один раз.
const subOne = multicasted$.subscribe(observer);
const subTwo = multicasted$.subscribe(observer);

// отписываемся
setTimeout(() => {
  connectedSub.unsubscribe();
}, 3000);
