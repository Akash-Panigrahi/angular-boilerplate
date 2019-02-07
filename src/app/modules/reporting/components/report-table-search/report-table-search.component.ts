import {
    Component, OnInit, EventEmitter, Output
} from '@angular/core';

@Component({
    selector: 'app-report-table-search',
    templateUrl: './report-table-search.component.html',
    styleUrls: ['./report-table-search.component.scss']
})
export class ReportTableSearchComponent implements OnInit {

    @Output() searchChangeEvent = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

}
