import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
    selector: 'app-kpis',
    templateUrl: './kpis.component.html',
    styleUrls: ['./kpis.component.scss']
})
export class KpisComponent implements OnInit, OnChanges {

    // specify @Input field which will hold input data from parent component
    @Input() kpis;

    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        /*
            dont listen to first time changes,
            since we are calling data dynamically
            from api service
        */
        if (!changes.kpis.isFirstChange()) {
            this.kpis = changes.kpis.currentValue;
        }
    }
}
