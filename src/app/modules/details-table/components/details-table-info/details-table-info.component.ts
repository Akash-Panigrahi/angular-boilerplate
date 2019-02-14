import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-details-table-info',
    templateUrl: './details-table-info.component.html',
    styleUrls: ['./details-table-info.component.scss']
})
export class DetailsTableInfoComponent {

    @Input() detailsInfoFrom: number;
    @Input() detailsInfoTo: number;
    @Input() detailsInfoTotal: number;
    @Input() detailsInfoFilteredFrom: number;
}
