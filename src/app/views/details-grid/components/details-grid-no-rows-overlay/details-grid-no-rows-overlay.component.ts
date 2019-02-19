import { Component } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-details-grid-no-rows-overlay',
    templateUrl: './details-grid-no-rows-overlay.component.html',
    styleUrls: ['./details-grid-no-rows-overlay.component.scss']
})
export class DetailsGridNoRowsOverlayComponent implements INoRowsOverlayAngularComp {

    private _params: any;

    agInit(params): void {
        this._params = params;
    }
}
