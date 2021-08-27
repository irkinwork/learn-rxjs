import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilKeyChanged, pluck, scan } from 'rxjs/operators';

export class StoreObservable {
  constructor(initialState) {
    this._store$ = new BehaviorSubject(initialState);
    // подписываемся на поток this._updates. Это Subject, в него передаются данные через next(), который вызывается в updateState. При каждом изменении потока срабатывает subscribe, который записывает преобразованные данные в стор.
    // почему мы не можем сразу писать в стор? Можем, можем даже обойтись без scan...
    this._updates$ = new Subject();

    this._updates$.pipe(scan((acc, curr) => ({ ...acc, ...curr }))).subscribe(this._store$);
  }

  updateState(state) {
    // this._store$.next({ ...this._store$.value, ...state });
    this._updates$.next(state);
  }

  selectState(stateKey) {
    return this._store$.pipe(distinctUntilKeyChanged(stateKey), pluck(stateKey));
  }
}
