import { Component, OnInit, HostBinding } from '@angular/core';
import { dashboardRouterAnimation } from './../../dashboard-router.animations';
import { pageAnimation } from './home-page.animations';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    animations: [
        dashboardRouterAnimation,
        pageAnimation
    ]
})
export class HomePageComponent implements OnInit {

    // animation
    @HostBinding('@pageAnimation') get pageAnimation() { return ''; }

    dateTimeRange;

    constructor() { }

    ngOnInit() {
    }

    receiveDateTimeRange(e) {
        this.dateTimeRange = e;
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
