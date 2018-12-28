import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
    selector: 'app-kpis',
    templateUrl: './kpis.component.html',
    styleUrls: ['./kpis.component.scss']
})
export class KpisComponent implements OnInit, OnChanges {

    @Input() kpis;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.kpis = changes.kpis.currentValue;
    }
}
