import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { slideDown } from './action-bar.animations';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { ActionBarUIState } from './action-bar.ui-state';
import { Subject } from 'rxjs';
import { DateTimeRangeService } from '../../services/date-time-range/date-time-range.service';
import { take, tap, takeUntil } from 'rxjs/operators';
import { DateTimeRange } from '../../interfaces/date-time-range.interface';
import { DetailsGridRequestService } from '../../services/details-grid-request/details-grid-request.service';

// declare variables to avoid error in aot compilation process
declare const $: any;
declare const moment: any;

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss'],
    animations: [slideDown]
})
export class ActionBarComponent implements OnInit, AfterViewInit, OnDestroy {
    // getting a reference to the progress bar in the html file
    @ViewChild('gettingDataBar') private _progressBar: NgProgressComponent;

    // property required to trigger animation
    isOpen = false;

    // setting initial date when app is opened
    lastUpdated = new Date();

    private _dateTimeRange: DateTimeRange;

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
    };

    constructor(
        private _dateTimeRangeService: DateTimeRangeService,
        private _storage: StorageService,
        private _actionBarUIState: ActionBarUIState,
        private _detailsGridRequest: DetailsGridRequestService
    ) {}

    ngOnInit() {
        this._storage
            .getItem('date-time-range')
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((dateTimeRangeData: DateTimeRange) => {
                this._dateTimeRange = dateTimeRangeData;
            });
    }

    ngAfterViewInit() {
        let start, end;

        if (!this._dateTimeRange) {
            start = moment(new Date());
            end = moment(new Date());
        } else {
            start = this._setMoment(this._dateTimeRange.startDate, this._dateTimeRange.startTime);
            end = this._setMoment(this._dateTimeRange.endDate, this._dateTimeRange.endTime);
        }

        $('#reportrange').daterangepicker(
            {
                timePicker: true,
                showDropdowns: true,
                startDate: start,
                endDate: end,
                locale: {
                    format: 'DD/MM/YYYY h:mm:ss A'
                },
                maxDate: new Date(),
                parentEl: '.action-bar',
                ranges: {
                    Today: [moment(), moment()],
                    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [
                        moment()
                            .subtract(1, 'month')
                            .startOf('month'),
                        moment()
                            .subtract(1, 'month')
                            .endOf('month')
                    ],
                    'Last Year': [
                        moment()
                            .subtract(1, 'year')
                            .startOf('year'),
                        moment()
                            .subtract(1, 'year')
                            .endOf('year')
                    ]
                }
            },
            this._updateDateRangePicker
        );

        $('#reportrange').on('apply.daterangepicker', this._applyDateRangePicker);

        // setting date-time-range in storage once
        this._setDateTimeRangeInStorage(start, end);
        this._updateDateRangePicker(start, end);
    }

    private _updateDateRangePicker(start, end) {
        $('#reportrange span').html(
            start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY')
        );
    }

    private _setMoment(date, time) {
        date = moment(date);
        time = moment(time, 'h:mm:ss');

        date.set({
            hour: time.get('hour'),
            minute: time.get('minute'),
            second: time.get('second')
        });

        return date;
    }

    private _setDateTimeRangeInStorage(start, end): void {
        const dateTimeRange = {
            startDate: start.format('YYYY-MM-DD'),
            endDate: end.format('YYYY-MM-DD'),
            startTime: start.format('H:mm:ss'),
            endTime: end.format('H:mm:ss')
        };

        // pass new value in the stream
        this._dateTimeRangeService.changeDateTimeRange(dateTimeRange);
    }

    isCalendarOpen() {
        // triggering animation by changing state
        this.isOpen = !this.isOpen;
    }

    private _isOldDateRange(picker): boolean {
        const { oldStartDate, oldEndDate, startDate, endDate } = picker;

        if (
            oldStartDate.format('YYYY-MM-DD H:mm:ss') === startDate.format('YYYY-MM-DD H:mm:ss') &&
            oldEndDate.format('YYYY-MM-DD H:mm:ss') === endDate.format('YYYY-MM-DD H:mm:ss')
        ) {
            return true;
        }

        return false;
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }
}
