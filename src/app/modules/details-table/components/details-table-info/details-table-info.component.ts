import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-details-table-info',
    templateUrl: './details-table-info.component.html',
    styleUrls: ['./details-table-info.component.scss']
})
export class DetailsTableInfoComponent implements OnInit {

    @Input()
    detailsInfoFrom: number;

    @Input()
    detailsInfoTo: number;

    @Input()
    detailsInfoTotal: number;

    constructor() { }

    ngOnInit() {
    }

}
