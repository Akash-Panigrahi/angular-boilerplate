import {
    Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, AfterViewInit, EventEmitter, Output, ViewChild
} from '@angular/core';
import { formatDate } from '@angular/common';
import { FormatTimeService } from 'src/app/core/services/format-time/format-time.service';
import {
    isInitialTableReady__Table, gettingClientsLoader, showOverlay
} from './report-datatable.animations';
import { NgProgressComponent } from '@ngx-progressbar/core';
import {
    AgGridEvent, GridApi, ColumnApi, ICellRendererParams
} from 'ag-grid-community';

@Component({
    selector: 'app-report-datatable',
    templateUrl: './report-datatable.component.html',
    styleUrls: ['./report-datatable.component.scss'],
    animations: [
        isInitialTableReady__Table,
        gettingClientsLoader,
        showOverlay
    ]
})
export class ReportDatatableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() clients: any[];

    @Output() reportTableRequestEvent = new EventEmitter<any>();

    // getting a reference to the progress bar in the html file
    @ViewChild('gettingClientsBar') private _progressBar: NgProgressComponent;

    reportTableRequest = {
        start: 0,
        length: 5
    };

    recordsInfo = {
        from: 0,
        to: 0,
        total: 0
    };

    isInitialTableReady = 'no';
    isInitialTableReady__Table = 'no';

    // enable sorting on all columns by default
    defaultColDef = {
        sortable: true
    };

    columnDefs = [
        { headerName: 'Id', field: 'id' },
        { headerName: 'First Name', field: 'first_name' },
        { headerName: 'Last Name', field: 'last_name' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Gender', field: 'gender' },
        { headerName: 'Start Date', field: 'start_date' },
        { headerName: 'End Date', field: 'end_date' },
        {
            headerName: 'Start Time', field: 'start_time',
            cellRenderer: (params: ICellRendererParams) => this._formatTimeService.formatTime(params.value)
        },
        {
            headerName: 'End Time', field: 'end_time',
            cellRenderer: (params: ICellRendererParams) => this._formatTimeService.formatTime(params.value)
        },
    ];

    rowData: any;

    gridApi: GridApi;
    gridColumnApi: ColumnApi;

    pageSizes = [5, 10, 25, 50, 100];
    page = 1;
    paginationCollectionSize;

    private _emitDataTableRequestEvent() {
        this.reportTableRequestEvent.emit(this.reportTableRequest);
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
            const value = changes.clients.currentValue;

            this.rowData = value.data;
            this.recordsInfo = value.info;

            let pages = 1;
            const lastPageRowsCount = value.info.total % this.reportTableRequest.length;

            if (lastPageRowsCount >= 5) {
                pages = Math.ceil(value.info.total / this.reportTableRequest.length);
            } else if (lastPageRowsCount < 5) {
                pages = Math.floor(value.info.total / this.reportTableRequest.length);
            }

            this.paginationCollectionSize = pages * 10;

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
        this._emitDataTableRequestEvent();
    }

    gettingClientsBarCompleted() {
        this.isInitialTableReady = 'yes';
    }

    onGridReady(e: AgGridEvent) {
        this.gridApi = e.api;
        this.gridColumnApi = e.columnApi;

        this.gridColumnApi.autoSizeAllColumns();
    }

    onLengthChange(length) {
        length = Number(length);

        this.reportTableRequest.length = length;

        this.recordsInfo.total <= length
            ? this.onPageChange(1)
            : this.onPageChange(Math.ceil(this.recordsInfo.total / length))
            ;
    }

    onSearchChange(text) {
        this.gridApi.setQuickFilter(text);
    }

    onPageChange(page) {
        this.reportTableRequest.start = page - 1;

        this._emitDataTableRequestEvent();
        this.isInitialTableReady = 'no';
    }

    onSortChanged(e) {
        console.log(e);
    }

    ngOnDestroy() { }
}
