import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgProgressModule } from '@ngx-progressbar/core';
import { AgGridModule } from 'ag-grid-angular';

import { environment } from 'src/environments/environment';

import { CustomNgbPaginationDirective } from './directives/custom-ngb-pagination/custom-ngb-pagination.directive';

import { DetailsTableLengthComponent } from './components/details-table-length/details-table-length.component';
import { DetailsTableInfoComponent } from './components/details-table-info/details-table-info.component';
import { AgGridLoadingOverlayComponent } from './components/ag-grid-loading-overlay/ag-grid-loading-overlay.component';
import { DetailsTableSearchComponent } from './components/details-table-search/details-table-search.component';
import { AgGridNoRowsOverlayComponent } from './components/ag-grid-no-rows-overlay/ag-grid-no-rows-overlay.component';
import { AgGridHeaderComponent } from './components/ag-grid-header/ag-grid-header.component';
import { AgGridTableComponent } from './components/ag-grid-table/ag-grid-table.component';
import { DetailsTableComponent } from './details-table.component';

@NgModule({
    declarations: [
        CustomNgbPaginationDirective,
        DetailsTableLengthComponent,
        DetailsTableInfoComponent,
        AgGridLoadingOverlayComponent,
        AgGridNoRowsOverlayComponent,
        DetailsTableSearchComponent,
        AgGridHeaderComponent,
        AgGridTableComponent,
        DetailsTableComponent
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([
            AgGridLoadingOverlayComponent,
            AgGridNoRowsOverlayComponent,
            AgGridHeaderComponent
        ]),
        NgbPaginationModule.forRoot(),
        NgProgressModule
    ],
    exports: [DetailsTableComponent]
})
export class DetailsTableModule {
    constructor() {
        if (!environment.production) {
            console.log('DetailsTableModule loaded');
        }
    }
}
