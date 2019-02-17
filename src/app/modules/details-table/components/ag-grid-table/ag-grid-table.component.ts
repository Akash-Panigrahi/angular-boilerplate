import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, ICellRendererParams, AgGridEvent } from 'ag-grid-community';
import { AgGridLoadingOverlayComponent } from '../ag-grid-loading-overlay/ag-grid-loading-overlay.component';
import { AgGridNoRowsOverlayComponent } from '../ag-grid-no-rows-overlay/ag-grid-no-rows-overlay.component';
import { AgGridHeaderComponent } from '../ag-grid-header/ag-grid-header.component';
import { NoSortStateService } from '../ag-grid-header/no-sort-state.service';
import { IDetailsTableData } from 'src/app/core/interfaces/details-table.interface';
import { FormatTimeService } from 'src/app/modules/dashboard/services/format-time/format-time.service';

@Component({
    selector: 'app-ag-grid-table',
    templateUrl: './ag-grid-table.component.html',
    styleUrls: ['./ag-grid-table.component.scss'],
    providers: [NoSortStateService]
})
export class AgGridTableComponent implements OnChanges {

    @Input() detailsData: IDetailsTableData;

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
    }

    onViewportChanged(e: AgGridEvent): void {
        // for initial resizing of table
        e.columnApi.autoSizeAllColumns();
    }

    showLoadingOverlay() {
        this.gridApi.showLoadingOverlay();
    }

    autoSizeAllColumns() {
        this.gridColumnApi.autoSizeAllColumns();
    }
}
