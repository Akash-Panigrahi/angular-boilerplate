import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { DateTimeRange } from 'src/app/views/dashboard/interfaces/date-time-range.interface';
import { take } from 'rxjs/operators';

declare const moment: any;

@Injectable()
export class DateTimeRangeService {
    // service class required to facilitate data exchange between two components

    /*
        BehaviorSubject is a kind of Subject that allows to set initial value of stream.
        Subject allows for multicasting,
        so multiple components can listen to one data source.
    */
    private _dateTimeRangeSource = new BehaviorSubject(this._setDateTimeRange());

    // creating an observable from source for listening components to subscribe to
    // currentDateTimeRange = this._dateTimeRangeSource.asObservable();

    constructor(
        private _storage: StorageService
    ) { }

    changeDateTimeRange(dateTimeRange: DateTimeRange) {
        // emit a new value, that will be passed to listening components
        this._dateTimeRangeSource.next(dateTimeRange);
    }

    currentDateTimeRange() {

        let dateTimeRange;

        this._storage
            .getItem('date-time-range')
            .pipe(take(1))
            .subscribe((dateTimeRangeData: DateTimeRange) => dateTimeRange = dateTimeRangeData)
            ;

        if (!dateTimeRange) {
            /**
             * resetting observable if null in session storage
             * i.e., user is not logged in
             */
            this._dateTimeRangeSource = new BehaviorSubject(this._setDateTimeRange());
        }

        return this._dateTimeRangeSource.asObservable();
    }

    private _setDateTimeRange() {
        // setting initial value that will current date and time

        let dateTimeRange;

        this._storage
            .getItem('date-time-range')
            .pipe(take(1))
            .subscribe((dateTimeRangeData: DateTimeRange) => dateTimeRange = dateTimeRangeData)
            ;

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
