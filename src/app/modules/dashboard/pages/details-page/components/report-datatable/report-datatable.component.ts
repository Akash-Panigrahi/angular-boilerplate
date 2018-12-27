import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
declare const $: any;

@Component({
    selector: 'app-report-datatable',
    templateUrl: './report-datatable.component.html',
    styleUrls: ['./report-datatable.component.scss']
})
export class ReportDatatableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() clients: any[];

    dataTable: any;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes.clients.isFirstChange()) {
            this.dataTable.clear();
            this.dataTable.rows.add(changes.clients.currentValue);
            this.dataTable.draw();
        }
    }

    ngAfterViewInit() {
        this.dataTable = $('table').DataTable({
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
                { data: 'firstName' },
                { data: 'lastName' },
                { data: 'company' },
                { data: 'city' },
                { data: 'email' },
                {
                    data: 'picture',
                    sorting: false,
                    render: (data, type, full) => `
                        <img src=${data} alt="${full.firstName}'s Picture" style="width: 3rem; border-radius: 50%;">
                    `
                }
            ]
        });

        $.fn.DataTable.ext.pager.numbers_length = 5;
    }

    ngOnDestroy() {
        // this.dataTable.clear();
        this.dataTable.destroy();
    }
}
