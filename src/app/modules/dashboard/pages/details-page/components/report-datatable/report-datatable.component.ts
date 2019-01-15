import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    AfterViewInit,
    EventEmitter,
    Output,
    ViewChild,
    HostListener
} from '@angular/core';
import { formatDate } from '@angular/common';
import { FormatTimeService } from 'src/app/core/services/format-time/format-time.service';
import { IDataTableRequest } from 'src/app/core/interfaces/datatable.interface';
import { isInitialTableReady__Table, gettingClientsLoader } from './report-datatable.animations';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Observable } from 'rxjs';
declare const $: any;

@Component({
    selector: 'app-report-datatable',
    templateUrl: './report-datatable.component.html',
    styleUrls: ['./report-datatable.component.scss'],
    animations: [isInitialTableReady__Table, gettingClientsLoader]
})
export class ReportDatatableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() clients: any[];
    dataTable: any;
    dataTableData$: Observable<any>;

    @Output() dataTableRequestEvent = new EventEmitter<IDataTableRequest>();
    dataTableRequest: IDataTableRequest;

    // getting a reference to the progress bar in the html file
    @ViewChild('gettingClientsBar') private _progressBar: NgProgressComponent;

    isInitialTableReady = 'no';
    isInitialTableReady__Table = 'no';

    @HostListener('click', ['$event.target'])
    private _onClick(el) {
        if (
            // Sorting
            el.classList.contains('report-table__head') ||
            // Paging
            (
                el.classList.contains('page-link') ||
                el.parentElement.classList.contains('page-link')
            )
        ) {
            this._emitDataTableRequestEvent();
        }
    }

    @HostListener('change', ['$event.target'])
    private _onChange(el) {
        // Page Length
        if (el.classList.contains('report-table__length')) {
            this._emitDataTableRequestEvent();
        }
    }

    private _emitDataTableRequestEvent() {
        const settings = this.dataTable.settings()[0];
        this.dataTableRequest = settings.oApi._fnAjaxParameters(settings);

        this.dataTableRequestEvent.emit(this.dataTableRequest);
    }

    onIsInitialTableReady__Table(event) {

        // console.group(`${event.phaseName} animating`);
        // console.log(event);
        // console.log('From:', event.fromState);
        // console.log('To:', event.toState);
        // console.log('Total Time:', event.totalTime);
        // console.groupEnd();
    }

    constructor(
        private _formatTimeService: FormatTimeService
    ) { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes.clients.isFirstChange()) {

            // this.dataTable.clear();
            // this.dataTable.rows.add(changes.clients.currentValue.data);
            // this.dataTable.draw();
            this.dataTableData$ = changes.clients.currentValue.data;

            // settings paging info
            // _fnUpdateInfo

            // completing progress bar
            if (this._progressBar) {
                this._progressBar.complete();
            }
        }
    }

    isGettingClientsLoaderDone(e) {

        if (e.fromState === 'void' && e.toState === 'no') {
            // calling starting progress bar
            this._progressBar.start();
        }

        if (e.fromState === 'no' && e.toState === 'void') {
            this.isInitialTableReady__Table = 'yes';
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
            searching: false,
            dom: `
                <"row"
                    <"col-sm-12 col-md-6"l>
                    <"col-sm-12 col-md-6"f>
                >
                r
                <"table-responsive"t>
                <"row table-footer"
                    <"col-sm-12 col-md-5 table-footer__info"i>
                    <"col-sm-12 col-md-7"p>
                >
            `,
            columns: [
                { data: 'id', name: 'Id' },
                { data: 'first_name', name: 'First Name' },
                { data: 'last_name', name: 'Last Name' },
                { data: 'gender', name: 'Gender' },
                { data: 'email', name: 'Email' },
                {
                    data: 'start_date', name: 'Start Date',
                    render: data => formatDate(data, 'yyyy-MM-dd', 'en-US')
                },
                {
                    data: 'start_time', name: 'Start Time',
                    render: data => this._formatTimeService.formatTime(data)
                },
                {
                    data: 'end_date', name: 'End Date',
                    render: data => formatDate(data, 'yyyy-MM-dd', 'en-US')
                },
                {
                    data: 'end_time', name: 'End Time',
                    render: data => this._formatTimeService.formatTime(data)
                },
            ],
            initComplete: function () {
                $('div.dataTables_length select').addClass('report-table__length');
            },
            ajax: (data, callback, settings) => {
                this.dataTableRequest = settings.oApi._fnAjaxParameters(settings);
                this.dataTableRequestEvent.emit(this.dataTableRequest);
                console.log(this.dataTable);

                if (this.dataTableData$) {
                    this.dataTableData$.subscribe(data => {
                        callback(data);
                    });
                }
            }
        });

        // this._emitDataTableRequestEvent();

        // to set pagination buttons number
        $.fn.DataTable.ext.pager.numbers_length = 15;

        // setting progress bar configurations
        this._progressBar.color = 'red';
        this._progressBar.spinner = false;
    }

    gettingClientsBarCompleted() {
        this.isInitialTableReady = 'yes';
    }

    ngOnDestroy() {
        /*
            since jquery runs outside angular and in the global scope,
            we need to clear out the elements ourselves.
        */
        this.dataTable.clear();
        this.dataTable.destroy();
    }
}
