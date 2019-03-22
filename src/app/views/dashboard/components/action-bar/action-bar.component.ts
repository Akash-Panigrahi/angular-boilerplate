import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { take, tap, takeUntil } from 'rxjs/operators';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

import { slideDown } from './action-bar.animations';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ActionBarUIState } from './action-bar.ui-state';
import { DateTimeRangeService } from '../../services/date-time-range/date-time-range.service';
import { DateTimeRange } from '../../interfaces/date-time-range.interface';
import { DetailsGridRequestService } from '../../services/details-grid-request/details-grid-request.service';
import { DatetimerangeRef } from '../datetimerange/datetimerange-ref';
import { DatetimerangeOverlayService } from '../../services/datetimerange-overlay/datetimerange-overlay.service';
import { DatetimerangeComponent, Moment } from '../datetimerange/datetimerange.component';
import { MomentRange, } from '../../interfaces/datetimerange.interface';

// declare variables to avoid error in aot compilation process
declare const $: any;

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss'],
    animations: [slideDown]
})
export class ActionBarComponent implements OnInit, AfterViewInit, OnDestroy {
    // getting a reference to the progress bar in the html file
    @ViewChild('gettingDataBar') private _progressBar: NgProgressComponent;

    @ViewChild('datetimerangeEl', { read: ElementRef }) private _datetimerangeEl: HTMLElement;

    // property required to trigger animation
    // isOpen = false;

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

    start: Moment;
    end: Moment;

    private _datetimerangeRef: DatetimerangeRef;

    private _dateTimeRange: DateTimeRange;

    dateTimeRange2;

    private _onDestroy$ = new Subject<void>();

    private _applyDateRangePicker = (ev, picker) => {
        // everytime new date range is selected

        if (this._isOldDateRange(picker)) {
            return false;
        }

        // updating the value
        this.lastUpdated = new Date();

        this._actionBarUIState.changeGettingDataBar('start');

        // save in storage
        this._setDateTimeRangeInStorage(picker.startDate, picker.endDate);

        // reset details-grid-request value
        this._storage.setItem('details-grid-request', this._detailsGridRequest.initial());

        this._actionBarUIState.currentGettingDataBar
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(state => this._progressBar[state]());
    }

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
            this.start = moment(new Date());
            this.end = moment(new Date());
            this._setDateTimeRangeInStorage(this.start, this.end);
        } else {
            this.start = this._setMoment(this._dateTimeRange.startDate, this._dateTimeRange.startTime);
            this.end = this._setMoment(this._dateTimeRange.endDate, this._dateTimeRange.endTime);
        }
    }

    ngAfterViewInit() {

        // if (!this._dateTimeRange) {
        //     this.start = moment(new Date());
        //     this.end = moment(new Date());
        //     this._setDateTimeRangeInStorage(this.start, this.end);
        // } else {
        //     this.start = this._setMoment(this._dateTimeRange.startDate, this._dateTimeRange.startTime);
        //     this.end = this._setMoment(this._dateTimeRange.endDate, this._dateTimeRange.endTime);
        // }

        // $('#reportrange').daterangepicker(
        //     {
        //         timePicker: true,
        //         showDropdowns: true,
        //         startDate: start,
        //         endDate: end,
        //         locale: {
        //             format: 'DD/MM/YYYY h:mm:ss A'
        //         },
        //         maxDate: new Date(),
        //         parentEl: '.action-bar',
        //         ranges: {
        //             Today: [moment(), moment()],
        //             Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        //             'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        //             'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        //             'This Month': [moment().startOf('month'), moment().endOf('month')],
        //             'Last Month': [
        //                 moment()
        //                     .subtract(1, 'month')
        //                     .startOf('month'),
        //                 moment()
        //                     .subtract(1, 'month')
        //                     .endOf('month')
        //             ],
        //             'Last Year': [
        //                 moment()
        //                     .subtract(1, 'year')
        //                     .startOf('year'),
        //                 moment()
        //                     .subtract(1, 'year')
        //                     .endOf('year')
        //             ]
        //         }
        //     },
        //     this._updateDateRangePicker
        // );

        // $('#reportrange').on('apply.daterangepicker', this._applyDateRangePicker);

        // setting date-time-range in storage once
        // this._setDateTimeRangeInStorage(start, end);
        // this._updateDateRangePicker(start, end);
    }

    // private _updateDateRangePicker(start: Moment, end: Moment): void {
    //     $('#reportrange span').html(
    //         start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY')
    //     );
    // }

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

    private _setDateTimeRangeInStorage(start: Moment, end: Moment): void {
        // update local properties with current start and end times
        this.start = start;
        this.end = end;
        // this.dateTimeRange2 = `${this.getDate(start)} ${this.getDate(end)}`;

        const dateTimeRange = {
            startDate: this.getDate(start),
            endDate: this.getDate(end),
            startTime: this.getTime(start),
            endTime: this.getTime(end)
        };

        // pass new value in the stream
        this._dateTimeRangeService.changeDateTimeRange(dateTimeRange);
    }

    // isCalendarOpen() {
    //     // triggering animation by changing state
    //     this.isOpen = !this.isOpen;
    // }

    private _isOldDateRange(picker): boolean {
        const { oldStartDate, oldEndDate, startDate, endDate } = picker;

        if (
            this.getDateTime(oldStartDate) === this.getDateTime(startDate) &&
            this.getDateTime(oldEndDate) === this.getDateTime(endDate)
        ) {
            return true;
        }

        return false;
    }

    toggleDateTimeRange() {
        // triggering animation by changing state
        this._datetimerangeRef = this._datetimerangeOverlayService.open({
            el: this._datetimerangeEl,
            data: {
                dateTimeRange: [this.start, this.end],
                ranges: this.ranges
            }
        });

        this._datetimerangeRef
            .componentInstance
            .dateTime$
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(dateTimeRangeData => {
                this._dateTimeChange(...dateTimeRangeData);
            });
    }

    private _dateTimeChange(start: Moment, end: Moment): void {
        // everytime new date range is selected

        // updating the value
        this.lastUpdated = new Date();

        this._actionBarUIState.changeGettingDataBar('start');

        // save in storage
        this._setDateTimeRangeInStorage(start, end);

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
