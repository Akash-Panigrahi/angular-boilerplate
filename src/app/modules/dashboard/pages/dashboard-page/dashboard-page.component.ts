import { Component, OnInit, HostBinding } from '@angular/core';
import { dashboardRouterAnimation } from '../../dashboard-router.animations';
import { dashboardPageAnimation } from './dashboard-page.animations';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss'],
    animations: [
        dashboardRouterAnimation,
        dashboardPageAnimation
    ]
})
export class DashboardPageComponent implements OnInit {

    // bind pageAnimation animation on host
    @HostBinding('@dashboardPageAnimation') get dashboardPageAnimation() { return ''; }

    constructor() { }

    ngOnInit() {
    }
    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
