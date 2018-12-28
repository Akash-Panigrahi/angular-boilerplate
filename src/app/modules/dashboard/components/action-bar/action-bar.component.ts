import { Component, OnInit, AfterViewInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { slideDown } from './action-bar.animations';
import { DateTimeRangeService } from '../../services/date-time-range/date-time-range.service';

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

    @Output() dateTimeRangeEvent = new EventEmitter<object>();

    updateDateRangePicker = (start, end) => {

        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

        const dateTimeRange = {
            startDate: start.format('YYYY-MM-DD'),
            endDate: end.format('YYYY-MM-DD'),
            startTime: start.format('H:mm:ss'),
            endTime: end.format('H:mm:ss')
        };

        // save datetimerange in central store
        localStorage.setItem('date-time-range', JSON.stringify(dateTimeRange));

        this._dateTimeRangeService.changeDateTimeRange(dateTimeRange);
    }

    constructor(private _dateTimeRangeService: DateTimeRangeService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {

        const start = moment().startOf('hour');
        const end = moment().startOf('hour');

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
        }, this.updateDateRangePicker);

        this.updateDateRangePicker(start, end);
    }

    isCalendarOpen() {
        this.isOpen = !this.isOpen;
    }
}
