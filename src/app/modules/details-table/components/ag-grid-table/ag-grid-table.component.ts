import {
    Component, Input, OnChanges, SimpleChanges, Output, EventEmitter
} from '@angular/core';

import { GridApi, ColumnApi, ICellRendererParams, AgGridEvent } from 'ag-grid-community';

import { AgGridLoadingOverlayComponent } from '../ag-grid-loading-overlay/ag-grid-loading-overlay.component';
import { AgGridNoRowsOverlayComponent } from '../ag-grid-no-rows-overlay/ag-grid-no-rows-overlay.component';
import { AgGridHeaderComponent } from '../ag-grid-header/ag-grid-header.component';
import { FormatTimeService } from 'src/app/core/services/format-time/format-time.service';
import { NoSortStateService } from '../ag-grid-header/no-sort-state.service';
import { IDetailsTableData } from 'src/app/core/interfaces/details-table.interface';

@Component({
    selector: 'app-ag-grid-table',
    templateUrl: './ag-grid-table.component.html',
    styleUrls: ['./ag-grid-table.component.scss'],
    providers: [NoSortStateService]
})
export class AgGridTableComponent implements OnChanges {

    @Input()
    detailsData: IDetailsTableData;

    @Output()
    gridReadyEvent = new EventEmitter<AgGridEvent>();

    gridApi: GridApi;
    gridColumnApi: ColumnApi;

    // options on all columns by default
    defaultColDef = {
        sortable: true,
        // resizable: true,
    };

    columnDefs = [
        { headerName: 'Id', field: 'id' },
        { headerName: 'First Name', field: 'first_name' },
        { headerName: 'Last Name', field: 'last_name' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Gender', field: 'gender' },
        { headerName: 'Date', field: 'date' },
        {
            headerName: 'Time', field: 'time',
            cellRenderer: (params: ICellRendererParams) => this._formatTimeService.formatTime(params.value)
        },
    ];

    frameworkComponents = {
        customLoadingOverlay: AgGridLoadingOverlayComponent,
        customNoRowsOverlay: AgGridNoRowsOverlayComponent,
        agColumnHeader: AgGridHeaderComponent
    };

    loadingOverlayComponent = 'customLoadingOverlay';
    noRowsOverlayComponent = 'customNoRowsOverlay';

    constructor(
        private _formatTimeService: FormatTimeService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.detailsData.isFirstChange()) {
            this.detailsData = changes.detailsData.currentValue;
        }
    }

    onGridReady(e: AgGridEvent): void {
        this.gridApi = e.api;
        this.gridColumnApi = e.columnApi;
        this.gridReadyEvent.emit(e);
    }

    onViewportChanged(e: AgGridEvent): void {
        // for initially resizing of table
        e.columnApi.autoSizeAllColumns();
    }
}
