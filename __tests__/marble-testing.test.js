import { TestScheduler } from 'rxjs/testing';
import { delay, map, take } from 'rxjs/operators';
import { concat, from, interval, of, throwError } from 'rxjs';
import search from '../search';

describe('Marble testing in RxJS', () => {
  let testScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should convert ASCII diagrams to observables', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const source$ = cold('---a-b---c');
      const expected = '---a-b---c';

      expectObservable(source$).toBe(expected);
    });
  });

  it('shoul allow configuration of emitted values', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const source$ = cold('--a-b---c', { a: 1, b: 2, c: 3 });

      const final$ = source$.pipe(map(val => val * 10));

      const expected = '--a-b---c';

      expectObservable(final$).toBe(expected, { a: 10, b: 20, c: 30 });
    });
  });
  it('should convert let you identify subscription points', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const source$ = cold('-a---b-|');
      const sourceTwo$ = cold('-c---d-|');
      const final$ = concat(source$, sourceTwo$);

      const expected = '-a---b--c---d-|';
      const sourceOneExpectedOne = '^------!';
      const sourceTwoExpectedOne = '-------^------!';

      expectObservable(final$).toBe(expected);
      expectSubscriptions(source$.subscriptions).toBe(sourceOneExpectedOne);
      expectSubscriptions(sourceTwo$.subscriptions).toBe(sourceTwoExpectedOne);
    });
  });
  it('should let you test hot observables', () => {
    testScheduler.run(helpers => {
      const { hot, expectObservable } = helpers;
      const source$ = hot('-a---b-^---c');
      const final$ = source$.pipe(take(1));

      const expected = '----(c|)';

      expectObservable(final$).toBe(expected);
    });
  });
  it('shoud test synchronous operations', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const source$ = from([1, 2, 3, 4, 5]);

      const expected = '(abcde|)';

      expectObservable(source$).toBe(expected, { a: 1, b: 2, c: 3, d: 4, e: 5 });
    });
  });

  it('shoud test asynchronous operations', () => {
    testScheduler.run(helpers => {
      const { expectObservable } = helpers;
      const source$ = from([1, 2, 3, 4, 5]);
      const final$ = source$.pipe(delay(1000));
      const expected = '1s (abcde|)';

      expectObservable(final$).toBe(expected, { a: 1, b: 2, c: 3, d: 4, e: 5 });
    });
  });

  describe('complex logic - search', () => {
    it('shouldnt repeat search if terms are the same ', () => {
      testScheduler.run(helpers => {
        const { cold, expectObservable } = helpers;
        const term = 'testing';
        const source$ = cold('a 200ms b', {
          a: { target: { value: term } },
          b: { target: { value: term } },
        });
        const final$ = source$.pipe(
          search({
            getJSON: () => of(term).pipe(delay(300)),
          })
        );
        const expected = '500ms a';

        expectObservable(final$).toBe(expected, { a: term });
      });
    });
    it('shoud search different terms', () => {
      testScheduler.run(helpers => {
        const { cold, expectObservable } = helpers;
        const term = 'testing';
        const term2 = 'testing2';
        const source$ = cold('a 200ms b', {
          a: { target: { value: term } },
          b: { target: { value: term2 } },
        });
        const final$ = source$.pipe(
          search({
            getJSON: () => of(term2).pipe(delay(300)),
          })
        );
        const expected = '701ms b';

        expectObservable(final$).toBe(expected, { b: term2 });
      });
    });
    it('shoud return no value if error happens', () => {
      testScheduler.run(helpers => {
        const { cold, expectObservable } = helpers;
        const term = 'testing';
        const source$ = cold('a 200ms', {
          a: { target: { value: term } },
        });
        const final$ = source$.pipe(
          search({
            getJSON: () => throwError('error'),
          })
        );
        const expected = '';

        expectObservable(final$).toBe(expected);
      });
    });
  });

  it('Force completion for long running observables', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const source$ = interval(1000).pipe(map(val => `${val + 1} sec`));
      const expected = '1s a 999ms b 999ms c';
      const unsubscribe = '4s !';
      expectObservable(source$, unsubscribe).toBe(expected, { a: '1 sec', b: '2 sec', c: '3 sec' });
    });
  });
});
