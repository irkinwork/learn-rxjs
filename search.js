import { EMPTY } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';

export default ajaxHelper => source$ =>
  source$.pipe(
    debounceTime(200),
    pluck('target', 'value'),
    distinctUntilChanged(),
    switchMap(term => ajaxHelper.getJSON(term).pipe(catchError(() => EMPTY)))
  );
