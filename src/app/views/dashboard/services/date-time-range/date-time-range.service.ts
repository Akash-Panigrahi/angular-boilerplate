import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { DateTimeRange } from 'src/app/views/dashboard/interfaces/date-time-range.interface';
import { takeUntil } from 'rxjs/operators';

declare const moment: any;

@Injectable()
export class DateTimeRangeService implements OnDestroy {
    // service class required to facilitate data exchange between two components

    /*
        BehaviorSubject is a kind of Subject that allows to set initial value of stream.
        Subject allows for multicasting,
        so multiple components can listen to one data source.
    */
    // private _dateTimeRangeSource = new BehaviorSubject(this.initial());

    // creating an observable from source for listening components to subscribe to
    // currentDateTimeRange = this._dateTimeRangeSource.asObservable();

    private _onDestroy$ = new Subject<void>();

    private _dateTimeRange: DateTimeRange;

    constructor(private _storage: StorageService) {
        this._storage
            .getItem('date-time-range')
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((dateTimeRangeData: DateTimeRange) => {
                this._dateTimeRange = dateTimeRangeData;
            });
    }

    changeDateTimeRange(dateTimeRange: DateTimeRange): void {
        // emit a new value, that will be passed to listening components
        // this._dateTimeRangeSource.next(dateTimeRange);
        this._storage.setItem('date-time-range', dateTimeRange);
    }

    currentDateTimeRange() {
        if (!this._dateTimeRange) {
            /**
             * resetting observable if null in session storage
             * i.e., user is not logged in
             */
            this._storage.setItem('date-time-range', this.initial());
        }

        return this._storage.getItem('date-time-range');
    }

    private initial(): DateTimeRange {
        // setting initial value that will current date and time

        if (this._dateTimeRange) {
            return this._dateTimeRange;
        }

        const from = moment(new Date());
        const to = moment(new Date());

        return {
            fromDate: from.format('YYYY-MM-DD'),
            toDate: to.format('YYYY-MM-DD'),
            fromTime: from.format('H:mm:ss'),
            toTime: to.format('H:mm:ss')
        };
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }
}
