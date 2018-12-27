import { Component, OnInit, AfterViewInit, HostBinding } from '@angular/core';
import { slideDown } from './action-bar.animations';

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

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {

        const start = moment().startOf('hour');
        const end = moment().startOf('hour').add(32, 'hour');

        function daterangeCB(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }

        $('#reportrange').daterangepicker({
            timePicker: true,
            showDropdowns: true,
            startDate: start,
            endDate: end,
            locale: {
                format: 'DD/M/YYYY hh:mm A'
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
        }, daterangeCB);

        daterangeCB(start, end);
    }

    isCalendarOpen() {
        this.isOpen = !this.isOpen;
    }
}
