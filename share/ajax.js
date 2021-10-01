import { fromEvent, interval, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mapTo, mergeMapTo, share, shareReplay, tap } from 'rxjs/operators';

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

const click$ = fromEvent(document, 'click');

const ajax$ = ajax('https://api.github.com/users/octocat');

// если не использовать share или shareReplay - ajax эффект будет происходить на каждый клик.
// разница между share и shareReplay в том, что при использовании shareReplay, мы дублируем сообщения, которые были отправлены до того, как поток на них подписался
// мы можем регулировать количество сообщений, которые нужно дублировать и длительность в течении которой можно дублировать сообщения

const clickRequest$ = click$.pipe(mergeMapTo(ajax$), shareReplay());

clickRequest$.subscribe(observer);
clickRequest$.subscribe(observer2);

setTimeout(() => {
  console.log('subscribing!');
  clickRequest$.subscribe(observer);
}, 3000);
