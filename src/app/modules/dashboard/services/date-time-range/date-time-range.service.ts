import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DateTimeRangeService {

    private _dateTimeRangeSource = new Subject();
    currentDateTimeRange = this._dateTimeRangeSource.asObservable();

    constructor() { }

    changeDateTimeRange(dateTimeRange: object) {
        this._dateTimeRangeSource.next(dateTimeRange);
    }
}
