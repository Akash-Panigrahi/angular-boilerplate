import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { slideDown } from './action-bar.animations';
import { DateTimeRangeService } from 'src/app/core/services/date-time-range/date-time-range.service';

declare const $: any;
declare const moment: any;

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss'],
    animations: [slideDown]
})
export class ActionBarComponent implements OnInit, AfterViewInit {

    isOpen = false;

    lastUpdated = new Date();

    @Output() dateTimeRangeEvent = new EventEmitter<object>();

    private _applyDateRangePicker = (ev, picker) => {
        const start = picker.startDate;
        const end = picker.endDate;

        this._setDateTimeRangeInStore(start, end);
        this.lastUpdated = new Date();
        this._dateTimeRangeService.changeDateTimeRange(JSON.parse(sessionStorage.getItem('date-time-range')));
    }

    constructor(private _dateTimeRangeService: DateTimeRangeService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {

        const dateTimeRange = JSON.parse(sessionStorage.getItem('date-time-range'));
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

        this._setDateTimeRangeInStore(start, end);
        this._updateDateRangePicker(start, end);
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

    private _setDateTimeRangeInStore(start, end) {

        const dateTimeRange = {
            startDate: start.format('YYYY-MM-DD'),
            endDate: end.format('YYYY-MM-DD'),
            startTime: start.format('H:mm:ss'),
            endTime: end.format('H:mm:ss')
        };

        // save datetimerange in central store
        sessionStorage.setItem('date-time-range', JSON.stringify(dateTimeRange));
    }

    isCalendarOpen() {
        this.isOpen = !this.isOpen;
    }
}
