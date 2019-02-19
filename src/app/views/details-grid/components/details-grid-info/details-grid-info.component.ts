import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-details-grid-info',
    templateUrl: './details-grid-info.component.html',
    styleUrls: ['./details-grid-info.component.scss']
})
export class DetailsGridInfoComponent {

    @Input() detailsInfoFrom: number;
    @Input() detailsInfoTo: number;
    @Input() detailsInfoTotal: number;
    @Input() detailsInfoFilteredFrom: number;
}
