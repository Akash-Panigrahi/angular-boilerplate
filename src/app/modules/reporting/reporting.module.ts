import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ReportDatatableComponent } from './components/report-datatable/report-datatable.component';
import { CustomNgbPaginationDirective } from './directives/custom-ngb-pagination/custom-ngb-pagination.directive';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgProgressModule } from '@ngx-progressbar/core';
import { AgGridModule } from 'ag-grid-angular';
import { ReportTableLengthComponent } from './components/report-table-length/report-table-length.component';
import { ReportTableInfoComponent } from './components/report-table-info/report-table-info.component';
import { AgGridLoadingOverlayComponent } from './components/ag-grid-loading-overlay/ag-grid-loading-overlay.component';
import { ReportTableSearchComponent } from './components/report-table-search/report-table-search.component';
import { AgGridNoRowsOverlayComponent } from './components/ag-grid-no-rows-overlay/ag-grid-no-rows-overlay.component';
import { AgGridHeaderComponent } from './components/ag-grid-header/ag-grid-header.component';

@NgModule({
    declarations: [
        ReportDatatableComponent,
        CustomNgbPaginationDirective,
        ReportTableLengthComponent,
        ReportTableInfoComponent,
        AgGridLoadingOverlayComponent,
        AgGridNoRowsOverlayComponent,
        ReportTableSearchComponent,
        AgGridHeaderComponent
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
    exports: [ReportDatatableComponent]
})
export class ReportingModule {
    constructor() {
        if (!environment.production) {
            console.log('ReportingModule loaded');
        }
    }
}
