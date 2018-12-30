import { Component, OnInit, HostBinding } from '@angular/core';
import { riseUp } from './summary-page.animations';

@Component({
    selector: 'app-summary-page',
    templateUrl: './summary-page.component.html',
    styleUrls: ['./summary-page.component.scss'],
    animations: [riseUp]
})
export class SummaryPageComponent implements OnInit {

    @HostBinding('@riseUp') riseUp = true;

    basicColumn = [{
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }, {
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
    }, {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    }, {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    }];

    gradientPie = [
        { name: 'Chrome', y: 61.41 },
        { name: 'Internet Explorer', y: 11.84 },
        { name: 'Firefox', y: 10.85 },
        { name: 'Edge', y: 4.67 },
        { name: 'Safari', y: 4.18 },
        { name: 'Other', y: 7.05 }
    ];

    kpis = {
        total_calls: 40,
        inbound_calls: 11,
        outbound_calls: 29
    };

    constructor() { }

    ngOnInit() {
    }

}
