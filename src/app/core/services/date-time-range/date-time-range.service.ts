import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare const moment: any;

@Injectable({
    providedIn: 'root'
})
export class DateTimeRangeService {

    private _dateTimeRangeSource = new BehaviorSubject(this._setDateTimeRangeInStore());
    currentDateTimeRange = this._dateTimeRangeSource.asObservable();

    constructor() { }

    changeDateTimeRange(dateTimeRange) {
        this._dateTimeRangeSource.next(dateTimeRange);
    }

    private _setDateTimeRangeInStore() {

        const dateTimeRange = JSON.parse(sessionStorage.getItem('date-time-range'));

        if (dateTimeRange) {
            return dateTimeRange;
        }

        const start = moment(new Date());
        const end = moment(new Date());

        return {
            startDate: start.format('YYYY-MM-DD'),
            endDate: end.format('YYYY-MM-DD'),
            startTime: start.format('H:mm:ss'),
            endTime: end.format('H:mm:ss')
        };
    }
}
