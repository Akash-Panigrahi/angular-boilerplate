import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, ICellRendererParams, AgGridEvent } from 'ag-grid-community';
import { DetailsGridLoadingOverlayComponent } from '../details-grid-loading-overlay/details-grid-loading-overlay.component';
import { DetailsGridNoRowsOverlayComponent } from '../details-grid-no-rows-overlay/details-grid-no-rows-overlay.component';
import { DetailsGridHeaderComponent } from '../details-grid-header/details-grid-header.component';
import { FormatTimeService } from 'src/app/views/dashboard/services/format-time/format-time.service';
import { ChangeToNoSortStateService } from '../../services/change-to-no-sort-state/change-to-no-sort-state.service';
import { DetailsTableData } from '../../../dashboard/interfaces/details-grid.interfaces';

@Component({
    selector: 'app-details-grid-table',
    templateUrl: './details-grid-table.component.html',
    styleUrls: ['./details-grid-table.component.scss'],
    providers: [ChangeToNoSortStateService]
})
export class DetailsGridTableComponent implements OnChanges {

    @Input() detailsData: DetailsTableData;

    gridApi: GridApi;
    gridColumnApi: ColumnApi;

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
        customLoadingOverlay: DetailsGridLoadingOverlayComponent,
        customNoRowsOverlay: DetailsGridNoRowsOverlayComponent,
        agColumnHeader: DetailsGridHeaderComponent
    };

    loadingOverlayComponent = 'customLoadingOverlay';
    noRowsOverlayComponent = 'customNoRowsOverlay';

    constructor(
        private _formatTimeService: FormatTimeService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.detailsData.isFirstChange()) {
            this.detailsData = changes.detailsData.currentValue;
            this.gridColumnApi.autoSizeAllColumns();
        }
    }

    onGridReady(e: AgGridEvent): void {
        this.gridApi = e.api;

        // resizing columns in ag-grid table
        this.gridColumnApi = e.columnApi;
    }

    onViewportChanged(e: AgGridEvent): void {
        // for initial resizing of table
        e.columnApi.autoSizeAllColumns();
    }

    showLoadingOverlay(): void {
        this.gridApi.showLoadingOverlay();
    }
}
