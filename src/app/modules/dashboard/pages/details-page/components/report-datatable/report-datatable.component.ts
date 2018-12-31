import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { formatDate } from '@angular/common';
import { FormatTimeService } from 'src/app/core/services/format-time/format-time.service';
declare const $: any;

@Component({
    selector: 'app-report-datatable',
    templateUrl: './report-datatable.component.html',
    styleUrls: ['./report-datatable.component.scss']
})
export class ReportDatatableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() clients: any[];

    dataTable: any;

    constructor(
        private _formatTimeService: FormatTimeService
    ) { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes.clients.isFirstChange()) {
            this.dataTable.clear();
            this.dataTable.rows.add(changes.clients.currentValue);
            this.dataTable.draw();
        }
    }

    ngAfterViewInit() {

        this.dataTable = $('.report-table').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            lengthMenu: [5, 10, 25, 50, 100],
            language: {
                paginate: {
                    first: '<i class="material-icons">first_page</i>',
                    last: '<i class="material-icons">last_page</i>',
                    previous: '<i class="material-icons">chevron_left</i>',
                    next: '<i class="material-icons">chevron_right</i>'
                }
            },
            dom: `
                <"row"
                    <"col-sm-12 col-md-6"l>
                    <"col-sm-12 col-md-6"f>
                >
                r
                <"table-responsive"t>
                <"row"
                    <"col-sm-12 col-md-5"i>
                    <"col-sm-12 col-md-7"p>
                >
            `,
            columns: [
                { data: 'id' },
                { data: 'first_name' },
                { data: 'last_name' },
                { data: 'gender' },
                { data: 'email' },
                {
                    data: 'start_date',
                    render: data => formatDate(data, 'yyyy-MM-dd', 'en-US')
                },
                {
                    data: 'start_time',
                    render: data => this._formatTimeService.formatTime(data)
                },
                {
                    data: 'end_date',
                    render: data => formatDate(data, 'yyyy-MM-dd', 'en-US')
                },
                {
                    data: 'end_time',
                    render: data => this._formatTimeService.formatTime(data)
                },
            ]
        });

        $.fn.DataTable.ext.pager.numbers_length = 5;
    }

    ngOnDestroy() {
        this.dataTable.clear();
        this.dataTable.destroy();
    }
}
