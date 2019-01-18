import {
    Component, OnInit, AfterViewInit, ViewChild
} from '@angular/core';
import { slideDown } from './action-bar.animations';
import { DateTimeRangeService } from 'src/app/core/services/date-time-range/date-time-range.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { ActionBarUIState } from './action-bar.ui-state';

// declare variables to avoid error in aot compilation process
declare const $: any;
declare const moment: any;

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss'],
    animations: [slideDown]
})
export class ActionBarComponent implements OnInit, AfterViewInit {

    // getting a reference to the progress bar in the html file
    @ViewChild('gettingDataBar') private _progressBar: NgProgressComponent;

    // property required to trigger animation
    isOpen = false;

    // setting initial date when app is opened
    lastUpdated = new Date();

    private _applyDateRangePicker = (ev, picker) => {
        // everytime new date range is selected

        const start = picker.startDate;
        const end = picker.endDate;

        // save save in state
        this._setDateTimeRangeInState(start, end);

        // updating the value
        this.lastUpdated = new Date();

        // pass new value in the stream
        this._dateTimeRangeService.changeDateTimeRange(this._state.getState('date-time-range'));

        this._actionBarUIState.changeGettingDataBar('start');

        this._actionBarUIState.currentGettingDataBar.subscribe(state => {
            this._progressBar[state]();
        });
    }

    constructor(
        private _dateTimeRangeService: DateTimeRangeService,
        private _state: StateService,
        private _actionBarUIState: ActionBarUIState
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {

        const dateTimeRange = this._state.getState('date-time-range');
        let start, end;

        if (!dateTimeRange) {
            start = moment(new Date());
            end = moment(new Date());
        } else {
            start = this._setMoment(dateTimeRange.startDate, dateTimeRange.startTime);
            end = this._setMoment(dateTimeRange.endDate, dateTimeRange.endTime);
        }

        $('#reportrange').daterangepicker({
            timePicker: true,
            showDropdowns: true,
            startDate: start,
            endDate: end,
            locale: {
                format: 'DD/M/YYYY hh:mm:ss A'
            },
            maxDate: new Date(),
            parentEl: '.action-bar',
            ranges: {
                'Today': [
                    moment(), moment()
                ],
                'Yesterday': [
                    moment().subtract(1, 'days'), moment().subtract(1, 'days')
                ],
                'Last 7 Days': [
                    moment().subtract(6, 'days'), moment()
                ],
                'Last 30 Days': [
                    moment().subtract(29, 'days'), moment()
                ],
                'This Month': [
                    moment().startOf('month'), moment().endOf('month')
                ],
                'Last Month': [
                    moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')
                ]
            }
        }, this._updateDateRangePicker);

        $('#reportrange').on('apply.daterangepicker', this._applyDateRangePicker);

        this._setDateTimeRangeInState(start, end);
        this._updateDateRangePicker(start, end);

        // setting progress bar configurations
        this._progressBar.color = 'red';
    }

    private _updateDateRangePicker(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    private _setMoment(date, time) {
        date = moment(date);
        time = moment(time, 'HH:mm');

        date.set({
            hour: time.get('hour'),
            minute: time.get('minute'),
            second: time.get('second')
        });

        return date;
    }

    private _setDateTimeRangeInState(start, end) {

        const dateTimeRange = {
            startDate: start.format('YYYY-MM-DD'),
            endDate: end.format('YYYY-MM-DD'),
            startTime: start.format('H:mm:ss'),
            endTime: end.format('H:mm:ss')
        };

        // save datetimerange in state
        this._state.setState('date-time-range', dateTimeRange);
    }

    isCalendarOpen() {
        // triggering animation by changing state
        this.isOpen = !this.isOpen;
    }
}
