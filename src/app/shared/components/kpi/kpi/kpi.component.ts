import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-kpi',
    templateUrl: './kpi.component.html',
    styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {

    /*
        We are not listening for ngOnChanges and also not for firstChange(),
        since the @Input fields are static as opposed to it's parent component.
    */
    @Input() kpiTitle = '';
    @Input() kpiValue = '';
    @Input() kpiPercent = '';
    @Input() kpiPercentTitle = '';

    constructor() { }

    ngOnInit() {
    }

}
