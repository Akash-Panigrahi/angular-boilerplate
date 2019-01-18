import {
    Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, AfterViewInit, EventEmitter, Output, ViewChild, HostListener, ElementRef
} from '@angular/core';
import { formatDate } from '@angular/common';
import { FormatTimeService } from 'src/app/core/services/format-time/format-time.service';
import { IDataTableRequest } from 'src/app/core/interfaces/datatable.interface';
import {
    isInitialTableReady__Table, gettingClientsLoader
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
        isInitialTableReady__Table, gettingClientsLoader
    ]
})
export class ReportDatatableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() clients: any[];

    @Output() dataTableRequestEvent = new EventEmitter<IDataTableRequest>();
    dataTableRequest: IDataTableRequest;

    // getting a reference to the progress bar in the html file
    @ViewChild('gettingClientsBar') private _progressBar: NgProgressComponent;

    @ViewChild('reportTable') private _reportTable: ElementRef;

    isInitialTableReady = 'no';
    isInitialTableReady__Table = 'no';

    isLastPage = false;

    columnDefs = [
        { headerName: 'Id', field: 'id', sortable: true },
        { headerName: 'First Name', field: 'first_name', sortable: true },
        { headerName: 'Last Name', field: 'last_name', sortable: true },
        { headerName: 'Email', field: 'email', sortable: true },
        { headerName: 'Gender', field: 'gender', sortable: true },
        { headerName: 'Start Date', field: 'start_date', sortable: true },
        { headerName: 'End Date', field: 'end_date', sortable: true },
        {
            headerName: 'Start Time', field: 'start_time', sortable: true,
            cellRenderer: (params: ICellRendererParams) => this._formatTimeService.formatTime(params.value)
        },
        {
            headerName: 'End Time', field: 'end_time', sortable: true,
            cellRenderer: (params: ICellRendererParams) => this._formatTimeService.formatTime(params.value)
        },
    ];

    rowData: any;

    gridApi: GridApi;
    gridColumnApi: ColumnApi;

    pageSizes = [10, 25, 50, 100];

    @HostListener('click', ['$event.target'])
    private _onClick(el) {

        // if pagination button
        if (el.classList.contains('ag-paging-button')) {
            const refValue = el.attributes.ref.value;

            if (
                refValue === 'btLast' ||  // if last pagination button
                refValue === 'btNext'     // if next pagintion button
            ) {

                // if last page
                if (this.isLastPage) {
                    // call service
                    this._emitDataTableRequestEvent();
                }
            }

            this.isLastPage = this.gridApi.paginationGetCurrentPage() + 1 === this.gridApi.paginationGetTotalPages()
                ? true
                : false
                ;
        }
    }

    private _emitDataTableRequestEvent() {
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
            this.rowData = changes.clients.currentValue;

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

        // setting progress bar configurations
        this._progressBar.color = 'red';
        this._progressBar.spinner = false;
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
        this.gridApi.paginationSetPageSize(Number(length));
    }

    onSearchChange(text) {
        this.gridApi.setQuickFilter(text);
    }

    onPaginationChanged(e) {
        this._reportTable.nativeElement.querySelector('[ref="btLast"]').disabled = false;
        this._reportTable.nativeElement.querySelector('[ref="btNext"]').disabled = false;
    }

    ngOnDestroy() { }
}
