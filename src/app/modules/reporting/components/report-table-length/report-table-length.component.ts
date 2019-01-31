import {
    Component, OnInit, Input, Output, EventEmitter
} from '@angular/core';

@Component({
    selector: 'app-report-table-length',
    templateUrl: './report-table-length.component.html',
    styleUrls: ['./report-table-length.component.scss']
})
export class ReportTableLengthComponent implements OnInit {

    @Input() pageSizes: Array<number>;
    @Input() initialPageSize: number;

    @Output() lengthChangeEvent = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
    }

}
