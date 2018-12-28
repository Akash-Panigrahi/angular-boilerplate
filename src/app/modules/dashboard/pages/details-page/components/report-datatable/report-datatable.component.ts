import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { YyyyMmDdPipe } from 'src/app/shared/pipes/yyyy-MM-dd/yyyy-MM-dd.pipe';
import { HMmAPipe } from 'src/app/shared/pipes/h-mm-a/h-mm-a.pipe';
declare const $: any;

@Component({
    selector: 'app-report-datatable',
    templateUrl: './report-datatable.component.html',
    styleUrls: ['./report-datatable.component.scss'],
    providers: [YyyyMmDdPipe, HMmAPipe]
})
export class ReportDatatableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() clients: any[];

    dataTable: any;

    constructor(
        private _yyyyMMddPipe: YyyyMmDdPipe,
        private _hmmaPipe: HMmAPipe
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
                    render: data => this._yyyyMMddPipe.transform(data)
                },
                {
                    data: 'start_time',
                    render: data => this._hmmaPipe.transform(data)
                },
                {
                    data: 'end_date',
                    render: data => this._yyyyMMddPipe.transform(data)
                },
                {
                    data: 'end_time',
                    render: data => this._hmmaPipe.transform(data)
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
