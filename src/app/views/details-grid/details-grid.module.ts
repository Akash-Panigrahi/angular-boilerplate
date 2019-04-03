import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgProgressModule } from '@ngx-progressbar/core';
import { AgGridModule } from 'ag-grid-angular';

import { environment } from 'src/environments/environment';

import { CustomNgbPaginationDirective } from './directives/custom-ngb-pagination/custom-ngb-pagination.directive';

import { DetailsGridLengthComponent } from './components/details-grid-length/details-grid-length.component';
import { DetailsGridInfoComponent } from './components/details-grid-info/details-grid-info.component';
import { DetailsGridLoadingOverlayComponent } from './components/details-grid-loading-overlay/details-grid-loading-overlay.component';
import { DetailsGridSearchComponent } from './components/details-grid-search/details-grid-search.component';
import { DetailsGridNoRowsOverlayComponent } from './components/details-grid-no-rows-overlay/details-grid-no-rows-overlay.component';
import { DetailsGridHeaderComponent } from './components/details-grid-header/details-grid-header.component';
import { DetailsGridTableComponent } from './components/details-grid-table/details-grid-table.component';
import { DetailsGridComponent } from './details-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        CustomNgbPaginationDirective,

        DetailsGridLengthComponent,
        DetailsGridInfoComponent,
        DetailsGridLoadingOverlayComponent,
        DetailsGridNoRowsOverlayComponent,
        DetailsGridSearchComponent,
        DetailsGridHeaderComponent,
        DetailsGridTableComponent,
        DetailsGridComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        SharedModule,

        AgGridModule.withComponents([
            DetailsGridLoadingOverlayComponent,
            DetailsGridNoRowsOverlayComponent,
            DetailsGridHeaderComponent
        ]),
        NgProgressModule,
        NgbPaginationModule
    ],
    exports: [DetailsGridComponent]
})
export class DetailsGridModule {
    constructor() {
        if (!environment.production) {
            console.log('DetailsGridModule loaded');
        }
    }
}
