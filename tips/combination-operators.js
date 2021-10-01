import { Subject, fromEvent } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

const store$ = new Subject();

store$.next({
  id: 'abc123',
});

// subject не эмиттит значения на старте. их эмиттит только BehaviourSubject
store$.subscribe(console.log);

click$.pipe(withLatestFrom(store$)).subscribe(console.log);

// если запушить в сабджет значения после подписки - значения будут приходить
store$.next({
  id: 'abc123',
});
