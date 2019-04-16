import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { take, tap, takeUntil } from 'rxjs/operators';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ActionBarUIState } from './action-bar.ui-state';
import { DateTimeRangeService } from '../../services/date-time-range/date-time-range.service';
import { DateTimeRange } from '../../interfaces/date-time-range.interface';
import { DetailsGridRequestService } from '../../services/details-grid-request/details-grid-request.service';
import { DatetimerangeRef } from '../datetimerange/datetimerange-ref';
import { DatetimerangeOverlayService } from '../../services/datetimerange-overlay/datetimerange-overlay.service';
import { MomentRange, Moment } from '../../interfaces/datetimerange.interface';

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit, OnDestroy {
    // getting a reference to the progress bar in the html file
    @ViewChild('gettingDataBar') private _progressBar: NgProgressComponent;

    @ViewChild('datetimerangeEl', { read: ElementRef }) private _datetimerangeEl: HTMLElement;

    // setting initial date when app is opened
    lastUpdated = new Date();

    ranges = new Map<string, MomentRange>([
        ['Today', [
            moment(), moment()
        ]],
        ['Yesterday', [
            moment().subtract(1, 'days'), moment().subtract(1, 'days')
        ]],
        ['Last 7 Days', [
            moment().subtract(6, 'days'), moment()
        ]],
        ['Last 30 Days', [
            moment().subtract(29, 'days'), moment()
        ]],
        ['This Month', [
            moment().startOf('month'), moment().endOf('month')
        ]],
        ['Last Month', [
            moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')
        ]],
        ['Last Year', [
            moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')
        ]],
    ]);

    from: Moment;
    to: Moment;

    max = new Date();

    private _datetimerangeRef: DatetimerangeRef;

    private _dateTimeRange: DateTimeRange;

    private _onDestroy$ = new Subject<void>();

    constructor(
        private _dateTimeRangeService: DateTimeRangeService,
        private _storage: StorageService,
        private _actionBarUIState: ActionBarUIState,
        private _detailsGridRequest: DetailsGridRequestService,
        private _datetimerangeOverlayService: DatetimerangeOverlayService,
    ) {}

    ngOnInit() {
        this._storage
            .getItem('date-time-range')
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((dateTimeRangeData: DateTimeRange) => {
                this._dateTimeRange = dateTimeRangeData;
            });

        if (!this._dateTimeRange) {
            this.from = moment(new Date());
            this.to = moment(new Date());
            this._setDateTimeRangeInStorage(this.from, this.to);
        } else {
            this.from = this._setMoment(this._dateTimeRange.fromDate, this._dateTimeRange.fromTime);
            this.to = this._setMoment(this._dateTimeRange.toDate, this._dateTimeRange.toTime);
        }
    }

    private _setMoment(date: string, time: string): Moment {
        const momentDate = moment(date);
        const momentTime = moment(time, 'h:mm:ss');

        momentDate.set({
            hour: momentTime.get('hour'),
            minute: momentTime.get('minute'),
            second: momentTime.get('second')
        });

        return momentDate;
    }

    private _setDateTimeRangeInStorage(from: Moment, to: Moment): void {
        // update local properties with current from and to times
        this.from = from;
        this.to = to;
        // this.dateTimeRange2 = `${this.getDate(from)} ${this.getDate(to)}`;

        const dateTimeRange = {
            fromDate: this.getDate(from),
            toDate: this.getDate(to),
            fromTime: this.getTime(from),
            toTime: this.getTime(to)
        };

        // pass new value in the stream
        this._dateTimeRangeService.changeDateTimeRange(dateTimeRange);
    }

    toggleDateTimeRange() {

        // triggering animation by changing state
        this._datetimerangeRef = this._datetimerangeOverlayService.open({
            el: this._datetimerangeEl,
            data: {
                dateTimeRange: [this.from, this.to],
                ranges: this.ranges,
                max: this.max
            }
        });

        this._datetimerangeRef
            .componentInstance
            .dateTime$
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(dateTimeRangeData => {
                this.onDateTimeChange(...dateTimeRangeData);
            });
    }

    onDateTimeChange(from: Moment, to: Moment): void {
        // everytime new date range is selected

        // updating the value
        this.lastUpdated = new Date();

        this._actionBarUIState.changeGettingDataBar('start');

        // save in storage
        this._setDateTimeRangeInStorage(from, to);

        // reset details-grid-request value
        this._storage.setItem('details-grid-request', this._detailsGridRequest.initial());

        this._actionBarUIState.currentGettingDataBar
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(state => this._progressBar[state]());
    }

    getDateTime(date: Moment): string {
        return moment(date).format('YYYY-MM-DD H:mm:ss');
    }

    getDate(date: Moment): string {
        return moment(date).format('YYYY-MM-DD');
    }

    getTime(date: Moment): string {
        return moment(date).format('H:mm:ss');
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }
}
