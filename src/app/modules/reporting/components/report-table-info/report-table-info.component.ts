import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-report-table-info',
    templateUrl: './report-table-info.component.html',
    styleUrls: ['./report-table-info.component.scss']
})
export class ReportTableInfoComponent implements OnInit{

    @Input() recordsInfoFrom: number;
    @Input() recordsInfoTo: number;
    @Input() recordsInfoTotal: number;

    constructor() { }

    ngOnInit() {
    }

}
