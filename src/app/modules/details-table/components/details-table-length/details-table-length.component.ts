import {
    Component, OnInit, Input, Output, EventEmitter
} from '@angular/core';

@Component({
    selector: 'app-details-table-length',
    templateUrl: './details-table-length.component.html',
    styleUrls: ['./details-table-length.component.scss']
})
export class DetailsTableLengthComponent implements OnInit {

    @Input() pageSizes: Array<number>;
    @Input() initialPageSize: number;

    @Output() lengthChangeEvent = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
    }

}
