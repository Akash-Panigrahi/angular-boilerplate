import { Component } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-details-grid-loading-overlay',
    templateUrl: './details-grid-loading-overlay.component.html',
    styleUrls: ['./details-grid-loading-overlay.component.scss']
})
export class DetailsGridLoadingOverlayComponent implements ILoadingOverlayAngularComp {

    private _params: any;

    agInit(params): void {
        this._params = params;
    }
}
