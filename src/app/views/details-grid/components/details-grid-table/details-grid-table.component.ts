import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, ICellRendererParams, AgGridEvent } from 'ag-grid-community';
import { DetailsGridLoadingOverlayComponent } from '../details-grid-loading-overlay/details-grid-loading-overlay.component';
import { DetailsGridNoRowsOverlayComponent } from '../details-grid-no-rows-overlay/details-grid-no-rows-overlay.component';
import { DetailsGridHeaderComponent } from '../details-grid-header/details-grid-header.component';
import { ChangeToNoSortStorageService } from '../../services/change-to-no-sort-state/change-to-no-sort-state.service';

@Component({
    selector: 'app-details-grid-table',
    templateUrl: './details-grid-table.component.html',
    styleUrls: ['./details-grid-table.component.scss'],
    providers: [ChangeToNoSortStorageService]
})
export class DetailsGridTableComponent implements OnChanges {

    dataSource = [
        {
            seqNo: '1',
            description: 'Building First App',
            duration: '4:17'
        },
        {
            seqNo: '2',
            description: 'Building First Component',
            duration: '2:07'
        },
        {
            seqNo: '3',
            description: '@Input - How to pass data',
            duration: '2:33'
        }
    ];

    displayedColumns = ["seqNo", "description", "duration"];

    @Input() tableData: any[];

    gridApi: GridApi;
    gridColumnApi: ColumnApi;

    defaultColDef = {
        sortable: true,
        // resizable: true,
    };

    columnDefs = [
        { headerName: 'Id', field: 'id' },
        { headerName: 'Mobile', field: 'mobile' },
        { headerName: 'First Name', field: 'firstname' },
        { headerName: 'Last Name', field: 'lastname' },
        { headerName: 'Date', field: 'date' },
        { headerName: 'Time', field: 'time' },
    ];

    frameworkComponents = {
        customLoadingOverlay: DetailsGridLoadingOverlayComponent,
        customNoRowsOverlay: DetailsGridNoRowsOverlayComponent,
        agColumnHeader: DetailsGridHeaderComponent
    };

    loadingOverlayComponent = 'customLoadingOverlay';
    noRowsOverlayComponent = 'customNoRowsOverlay';

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.gridColumnApi) {
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

    onRowClicked(row) {
        console.log(row);
    }
}
