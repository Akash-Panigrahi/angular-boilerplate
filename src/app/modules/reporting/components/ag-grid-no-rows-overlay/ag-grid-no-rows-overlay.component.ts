import { Component } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-ag-grid-no-rows-overlay',
    templateUrl: './ag-grid-no-rows-overlay.component.html',
    styleUrls: ['./ag-grid-no-rows-overlay.component.scss']
})
export class AgGridNoRowsOverlayComponent implements INoRowsOverlayAngularComp {

    private _params: any;

    agInit(params): void {
        this._params = params;
    }
}
