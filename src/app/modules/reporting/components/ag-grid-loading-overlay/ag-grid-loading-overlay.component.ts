import { Component } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-ag-grid-loading-overlay',
    templateUrl: './ag-grid-loading-overlay.component.html',
    styleUrls: ['./ag-grid-loading-overlay.component.scss']
})
export class AgGridLoadingOverlayComponent implements ILoadingOverlayAngularComp {

    private _params: any;

    agInit(params): void {
        this._params = params;
    }
}
