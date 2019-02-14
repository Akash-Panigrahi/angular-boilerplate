import {
    Component, Input, OnChanges, SimpleChanges, EventEmitter, Output, ViewChild, HostListener
} from '@angular/core';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { takeWhile, endWith, tap } from 'rxjs/operators';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import {
    ISortEvent, IDetailsTableData, IDetailsTableRequest, IDetailsTableResponse
} from 'src/app/core/interfaces/details-table.interface';
import { initialTableReady, gettingDetailsLoader } from './details-table.animations';
import { AgGridTableComponent } from './components/ag-grid-table/ag-grid-table.component';

@Component({
    selector: 'app-details-table',
    templateUrl: './details-table.component.html',
    styleUrls: ['./details-table.component.scss'],
    animations: [
        initialTableReady,
        gettingDetailsLoader
    ]
})
export class DetailsTableComponent implements OnChanges {

    @Input() details: IDetailsTableResponse[];
    @Input() detailsTableRequest: IDetailsTableRequest;

    @Output() detailsTableRequestEvent = new EventEmitter<IDetailsTableRequest>();
    @Output() downloadDetailsEvent = new EventEmitter<IDetailsTableRequest>();

    // references to elements in the html file
    @ViewChild('gettingDetailsBar') private _progressBar: NgProgressComponent;
    @ViewChild('detailsTablePagination') private _detailsTablePagination: NgbPagination;
    @ViewChild('agGridTable') private _agGridTable: AgGridTableComponent;

    detailsInfo = {
        from: 0,
        to: 0,
        total: 0,
        filteredFrom: 0
    };

    showGettingDetailsLoader = true;
    initialTableReady = 'no';
    pageSizes = [3, 5, 10, 25, 50, 100];

    detailsData: IDetailsTableData[];
    paginationCollectionSize: number;
    currentPage: number;

    @HostListener('detailsTableSortChangeEvent', ['$event.detail'])
    private _onDetailsTableSortChange(detail) {
        this.onSortChange(detail);
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (!changes.details.isFirstChange()) {

            const details = changes.details.currentValue;

            this.detailsData = details.data;
            this.detailsInfo = details.info;

            let pages = 1;

            pages = details.info.total % this.detailsTableRequest.length >= 5
                ? Math.ceil(details.info.total / this.detailsTableRequest.length)
                : Math.floor(details.info.total / this.detailsTableRequest.length)
                ;

            this.paginationCollectionSize = (pages || 1) * 10;

            // resetting page to previous page
            this._detailsTablePagination.page = this.detailsTableRequest.start + 1;
            this.currentPage = this._detailsTablePagination.page;

            if (this._agGridTable) {
                // resizing columns in ag-grid table
                this._agGridTable.autoSizeAllColumns();
            }

            // completing progress bar
            if (this._progressBar) {

                this._progressBar.state$
                    .pipe(
                        // tap(console.log),
                        takeWhile(value => !value.active),
                        endWith({ active: true, transform: '' })
                    )
                    .subscribe(() => this._progressBar.complete())
                    ;
            }
        }
    }

    private _emitDataTableRequestEvent(): void {
        /*
            subsequent event requests generated by:
            1 - pagination button click **onPageChange**
            2 - display length change through **onLengthChange**
            3 - searching through table **onSearchChange**
            4 - sorting table **onSortChange**
        */

        this.detailsTableRequestEvent.emit(this.detailsTableRequest);

        // showing ag-grid loading overlay
        this._agGridTable.showLoadingOverlay();
    }


    /**
     * Animation Events
     */

    private _debugAnimation(e) {
        console.group(`${e.phaseName} animating ${e.triggerName}`);
        console.log('From:', e.fromState);
        console.log('To:', e.toState);
        console.log('Total Time:', e.totalTime);
        console.groupEnd();
    }

    onGettingDetailsLoader(e): void {

        // entering
        if (e.fromState === 'void') {
            // calling starting progress bar
            this._progressBar.start();
        }

        // leaving
        if (e.toState === 'void') {
            this.initialTableReady = 'yes';
        }
    }

    onGettingDetailsProgressBarComplete(): void {
        /**
         * removing loader component from DOM
         * hence triggering animation
         */
        this.showGettingDetailsLoader = false;
    }


    /**
     * Table Events
     */

    onLengthChange(length: string): void {

        this.detailsTableRequest = {
            // resetting properties
            start: 0,
            sort: {
                sortKey: 'id',
                sortDir: 0
            },

            // changing properties
            length: Number(length),
            search: this.detailsTableRequest.search
        };

        // setting pagination so as to show first page
        this._detailsTablePagination.page = 1;

        /**
         * triggering change detection for
         * appCustomNgbPagination directive
         */
        this.currentPage = this._detailsTablePagination.page;

        this._emitDataTableRequestEvent();
    }

    onSearchChange(text: string): void {
        this.detailsTableRequest.search = text.toLowerCase();
        this.detailsTableRequest.start = 0;
        this._emitDataTableRequestEvent();
    }

    onPageChange(page: number): void {
        this.detailsTableRequest.start = page - 1;
        this._emitDataTableRequestEvent();
    }

    onSortChange(sort: ISortEvent): void {
        this.detailsTableRequest.sort = sort;
        this._emitDataTableRequestEvent();
    }
}
