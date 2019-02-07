import { BehaviorSubject } from 'rxjs';

export class NoSortStateService {
    private _noSortSource = new BehaviorSubject('NONE');
    currentNoSortState = this._noSortSource.asObservable();

    changeNoSortState(columnToSkip) {
        this._noSortSource.next(columnToSkip);
    }
}
