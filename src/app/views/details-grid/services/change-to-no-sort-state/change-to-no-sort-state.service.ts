import { BehaviorSubject } from 'rxjs';

export class ChangeToNoSortStorageService {
  private _noSortSource = new BehaviorSubject('NONE');
  currentNoSortState = this._noSortSource.asObservable();

  changeToNoSortState(columnToSkip) {
    this._noSortSource.next(columnToSkip);
  }
}
