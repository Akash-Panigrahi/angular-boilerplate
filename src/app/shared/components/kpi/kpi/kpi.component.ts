import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-kpi',
    templateUrl: './kpi.component.html',
    styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {

    @Input() kpiTitle = '';
    @Input() kpiValue = '';
    @Input() kpiPercent = '';
    @Input() kpiPercentTitle = '';

    constructor() { }

    ngOnInit() {
    }

}
