import { Subject } from 'rxjs';

const loading$ = new Subject();

export default {
    showLoading: () => loading$.next(true),
    hideLoading: () => loading$.next(false),
    loadingStatus: loading$.asObservable(),
}