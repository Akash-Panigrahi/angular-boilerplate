import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateService } from 'src/app/core/services/state/state.service';
import { DateTimeRange } from 'src/app/modules/dashboard/interfaces/date-time-range.interface';

declare const moment: any;

@Injectable({
    providedIn: 'root'
})
export class DateTimeRangeService {
    // service class required to facilitate data exchange between two components

    /*
        BehaviorSubject is a kind of Subject that allows to set initial value of stream.
        Subject allows for multicasting,
        so multiple components can listen to one data source.
    */
    private _dateTimeRangeSource = new BehaviorSubject(this._setDateTimeRangeInStore());

    // creating an observable from source for listening components to subscribe to
    // currentDateTimeRange = this._dateTimeRangeSource.asObservable();

    constructor(
        private _state: StateService
    ) { }

    changeDateTimeRange(dateTimeRange: DateTimeRange) {
        // emit a new value, that will be passed to listening components
        this._dateTimeRangeSource.next(dateTimeRange);
    }

    currentDateTimeRange() {

        if (!this._state.getState('date-time-range')) {
            /**
             * resetting observable if null in session storage
             * i.e., user is not logged in
             */
            this._dateTimeRangeSource = new BehaviorSubject(this._setDateTimeRangeInStore());
        }

        return this._dateTimeRangeSource.asObservable();
    }

    private _setDateTimeRangeInStore() {
        // setting initial value that will current date and time

        const dateTimeRange = this._state.getState('date-time-range');

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
