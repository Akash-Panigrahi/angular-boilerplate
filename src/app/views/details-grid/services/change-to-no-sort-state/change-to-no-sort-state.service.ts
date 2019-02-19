import { BehaviorSubject } from 'rxjs';

export class ChangeToNoSortStateService {
  private _noSortSource = new BehaviorSubject('NONE');
  currentNoSortState = this._noSortSource.asObservable();

  changeToNoSortState(columnToSkip) {
    this._noSortSource.next(columnToSkip);
  }
}
