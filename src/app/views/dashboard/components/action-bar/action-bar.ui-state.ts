import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActionBarUIState {

    private _gettingDataBarSource = new BehaviorSubject('start');
    currentGettingDataBar = this._gettingDataBarSource.asObservable();

    constructor() { }

    changeGettingDataBar(gettingDataBar) {
        this._gettingDataBarSource.next(gettingDataBar);
    }
}
